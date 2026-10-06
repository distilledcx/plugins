// Packs a plugin folder into a zip that claude.ai uploads under Customize > Plugins > Add > Upload plugin, and that the
// OpenAI plugin submission takes. The folder is the zip's one top-level entry. Run: bun scripts/pack.ts distilled
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { deflateRawSync } from "node:zlib";

const name = process.argv[2] ?? "distilled";
const root = join(import.meta.dir, "..", "plugins", name);
const out = join(import.meta.dir, "..", "dist", `${name}-plugin.zip`);

/** Every file under `dir`, in a stable order, leaving out what no installer wants. */
function files(dir: string): string[] {
  return readdirSync(dir)
    .filter((entry) => entry !== ".DS_Store" && entry !== "Thumbs.db")
    .sort()
    .flatMap((entry) => {
      const path = join(dir, entry);
      return statSync(path).isDirectory() ? files(path) : [path];
    });
}

const local: Uint8Array[] = [];
const central: Uint8Array[] = [];
let offset = 0;
for (const path of files(root)) {
  const nameBytes = new TextEncoder().encode(`${name}/${relative(root, path).replaceAll("\\", "/")}`);
  const data = readFileSync(path);
  const packed = deflateRawSync(data, { level: 9 });
  const crc = Bun.hash.crc32(data);
  const header = (signature: number, size: number) => {
    const bytes = new DataView(new ArrayBuffer(size));
    bytes.setUint32(0, signature, true);
    return bytes;
  };
  // A fixed date (1 Jan 2026), so the same files always pack to the same bytes.
  const time = 0;
  const date = ((2026 - 1980) << 9) | (1 << 5) | 1;
  const entry = header(0x04034b50, 30);
  entry.setUint16(4, 20, true);
  entry.setUint16(8, 8, true);
  entry.setUint16(10, time, true);
  entry.setUint16(12, date, true);
  entry.setUint32(14, crc, true);
  entry.setUint32(18, packed.byteLength, true);
  entry.setUint32(22, data.byteLength, true);
  entry.setUint16(26, nameBytes.byteLength, true);
  local.push(new Uint8Array(entry.buffer), nameBytes, packed);
  const record = header(0x02014b50, 46);
  record.setUint16(4, 20, true);
  record.setUint16(6, 20, true);
  record.setUint16(10, 8, true);
  record.setUint16(12, time, true);
  record.setUint16(14, date, true);
  record.setUint32(16, crc, true);
  record.setUint32(20, packed.byteLength, true);
  record.setUint32(24, data.byteLength, true);
  record.setUint16(28, nameBytes.byteLength, true);
  record.setUint32(42, offset, true);
  central.push(new Uint8Array(record.buffer), nameBytes);
  offset += 30 + nameBytes.byteLength + packed.byteLength;
}
const centralSize = central.reduce((sum, part) => sum + part.byteLength, 0);
const end = new DataView(new ArrayBuffer(22));
end.setUint32(0, 0x06054b50, true);
end.setUint16(8, central.length / 2, true);
end.setUint16(10, central.length / 2, true);
end.setUint32(12, centralSize, true);
end.setUint32(16, offset, true);
await Bun.write(out, new Blob([...local, ...central, new Uint8Array(end.buffer)]));
console.log(`${relative(process.cwd(), out)}: ${String(central.length / 2)} files`);
