const UPSTREAM =
  "https://github.com/itslucadev/AgentNotch/releases/latest/download/appcast.xml";

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=60, s-maxage=60",
};

// Last-known 1.0 feed so Sparkle still has something if GitHub is down.
const FALLBACK = `<?xml version="1.0" standalone="yes"?>
<rss xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle" version="2.0">
    <channel>
        <title>AgentNotch</title>
        <item>
            <title>1.0</title>
            <pubDate>Fri, 04 Sep 2026 09:17:50 +0200</pubDate>
            <link>https://lucabecker.dev/agent-notch</link>
            <sparkle:version>1</sparkle:version>
            <sparkle:shortVersionString>1.0</sparkle:shortVersionString>
            <sparkle:minimumSystemVersion>26.0</sparkle:minimumSystemVersion>
            <enclosure url="https://github.com/itslucadev/AgentNotch/releases/download/v1.0/AgentNotch.zip" length="3856382" type="application/octet-stream" sparkle:edSignature="LlSChT57JxvGJZCy0JuiRA6bUKL0D7h8YxmmW3c32oIcXzJla9+WYXD3UEhB6y/M+lqCfyUCJxma7EIzNSgsDA=="/>
        </item>
    </channel>
</rss>
`;

export const revalidate = 60;

export async function GET() {
  try {
    const upstream = await fetch(UPSTREAM, {
      headers: {
        Accept: "application/xml, application/octet-stream, text/xml, */*",
        "User-Agent": "lucabecker.dev Agent Notch appcast",
      },
      next: { revalidate: 60 },
      redirect: "follow",
    });
    if (upstream.ok) {
      const body = await upstream.text();
      if (body.includes("<rss") && body.includes("sparkle:")) {
        return new Response(body, { headers: XML_HEADERS });
      }
    }
  } catch {
    // Fall through to the 1.0 snapshot.
  }
  return new Response(FALLBACK, { headers: XML_HEADERS });
}
