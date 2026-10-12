/* Calendar export: UTC dates, escaped text, UTF-8-aware RFC5545 line folding. */
(() => {
  const A = window.Arcadia;
  A.modules.register("calendar", (root) => {
    const start = A.utils.date(root.dataset.arcadiaStart),
      end = A.utils.date(root.dataset.arcadiaEnd),
      title = root.dataset.arcadiaTitle;
    if (!start || !title) return;
    const stamp = (d) =>
      d
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
    const escape = (s) =>
      (s || "")
        .replace(/\\/g, "\\\\")
        .replace(/\r?\n/g, "\\n")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,");
    const fold = (line) => {
      let out = "",
        length = 0;
      for (const char of line) {
        const bytes = new TextEncoder().encode(char).length;
        if (length + bytes > 73) {
          out += "\r\n ";
          length = 1;
        }
        out += char;
        length += bytes;
      }
      return out;
    };
    root.hidden = false;
    const google = root.querySelector("[data-arcadia-google]");
    if (end && end > start) {
      const url = new URL("https://calendar.google.com/calendar/render");
      url.search = new URLSearchParams({
        action: "TEMPLATE",
        text: title,
        dates: stamp(start) + "/" + stamp(end),
        details: root.dataset.arcadiaDescription,
        location: root.dataset.arcadiaLocation,
      });
      google.href = url;
      google.hidden = false;
    }
    const click = () => {
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Arcadia//Events//EN",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        "UID:" + crypto.randomUUID() + "@" + location.hostname,
        "DTSTAMP:" + stamp(new Date()),
        "DTSTART:" + stamp(start),
        ...(end && end > start ? ["DTEND:" + stamp(end)] : []),
        "SUMMARY:" + escape(title),
        "DESCRIPTION:" + escape(root.dataset.arcadiaDescription),
        "LOCATION:" + escape(root.dataset.arcadiaLocation),
        "END:VEVENT",
        "END:VCALENDAR",
      ];
      const url = URL.createObjectURL(
        new Blob([lines.map(fold).join("\r\n") + "\r\n"], {
          type: "text/calendar;charset=utf-8",
        }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "event.ics";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    const button = root.querySelector("[data-arcadia-ics]");
    button.addEventListener("click", click);
    return () => button.removeEventListener("click", click);
  });
})();
