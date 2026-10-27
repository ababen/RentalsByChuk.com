# Chuk character assets

Full-size masters of the 3D Chuk character (blue-eyed version, Oct 2026).

| File | Use |
| --- | --- |
| `chuk-wave.png` | Homepage hero (`CHUK_WAVE`) |
| `chuk-thumbs-up.png` | Final call to action (`CHUK_THUMBS`) |
| `chuk-head.png` | Header/footer logo (`CHUK_HEAD`), cropped from the wave render |
| `chuk-turnaround.png` | Front / three-quarter / side / back reference for video or 3D tools |
| `chuk-expressions.png` | Smile, talking, laughing, thoughtful, surprised, wink |

The site ships these as inlined JPEG data URIs in `src/data/chukImages.ts`.

## Stickers (`stickers/`)

16 stickers, each with a caption and RentalsByChuk.com. See `stickers/preview.png` (shows 01–12; 13–16 are the greeting set: Hi!, Thank you!, God bless you!, You're welcome!).

- `whatsapp/` – 512×512 WebP (under 100 KB each) plus `tray.png` (96×96), the format WhatsApp sticker packs use.
- `imessage/` – 618×618 transparent PNGs.

**iMessage (iPhone, iOS 17+):** save the PNGs to Photos, then in Messages tap **+ → Stickers → +** and pick them, or send them as images.

**WhatsApp:** in a chat open the sticker tab → **Create** (iPhone) and pick a PNG, or load the `whatsapp/` folder into a sticker-pack maker app to install all 16 as one pack.

`stickers/tools/` holds the scripts used to build them (eye recolor, background cutout, sticker border, caption render with Playwright).
