<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Grammar Navigator Sitemap</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #faf6ef;
            color: #2a2520;
            margin: 0;
            padding: 2rem 1rem;
            line-height: 1.6;
          }
          .container { max-width: 960px; margin: 0 auto; }
          h1 { font-size: 1.75rem; font-weight: 600; margin-bottom: 0.5rem; }
          .subtitle { color: #8c7f70; margin-bottom: 1.5rem; }
          .stats { display: flex; gap: 2rem; margin-bottom: 2rem; }
          .stat { background: #fff; border: 1px solid #ddd8cf; border-radius: 12px; padding: 1rem 1.5rem; min-width: 120px; }
          .stat-value { font-size: 1.5rem; font-weight: 700; color: #b4452a; }
          .stat-label { font-size: 0.75rem; color: #8c7f70; text-transform: uppercase; letter-spacing: 0.05em; }
          table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #ddd8cf; border-radius: 12px; overflow: hidden; }
          thead { background: #ece3d0; }
          th { text-align: left; padding: 0.75rem 1rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #5a5046; font-weight: 600; }
          td { padding: 0.75rem 1rem; border-top: 1px solid #ece3d0; font-size: 0.875rem; }
          td a { color: #b4452a; text-decoration: none; word-break: break-all; }
          td a:hover { text-decoration: underline; }
          .alt-links { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem; }
          .alt-link { font-size: 0.75rem; background: #faf6ef; border: 1px solid #ddd8cf; border-radius: 4px; padding: 0.15rem 0.5rem; color: #5a5046; text-decoration: none; }
          .alt-link:hover { background: #ece3d0; }
          tr:hover td { background: #faf6ef; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Grammar Navigator Sitemap</h1>
          <p class="subtitle">XML sitemap for search engines. Human-readable view.</p>

          <!-- Sitemap Index -->
          <xsl:if test="s:sitemapindex">
            <div class="stats">
              <div class="stat">
                <div class="stat-value"><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></div>
                <div class="stat-label">Sitemaps</div>
              </div>
            </div>
            <table>
              <thead><tr><th>Sitemap URL</th></tr></thead>
              <tbody>
                <xsl:for-each select="s:sitemapindex/s:sitemap">
                  <tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td></tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>

          <!-- URL Set -->
          <xsl:if test="s:urlset">
            <div class="stats">
              <div class="stat">
                <div class="stat-value"><xsl:value-of select="count(s:urlset/s:url)"/></div>
                <div class="stat-label">URLs</div>
              </div>
              <div class="stat">
                <div class="stat-value"><xsl:value-of select="count(s:urlset/s:url/xhtml:link)"/></div>
                <div class="stat-label">Alternate links</div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width:60%">URL</th>
                  <th style="width:20%">Last Modified</th>
                  <th style="width:20%">Alternates</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td>
                      <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      <xsl:if test="xhtml:link">
                        <div class="alt-links">
                          <xsl:for-each select="xhtml:link">
                            <a class="alt-link" href="{@href}"><xsl:value-of select="@hreflang"/></a>
                          </xsl:for-each>
                        </div>
                      </xsl:if>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="s:lastmod"><xsl:value-of select="s:lastmod"/></xsl:when>
                        <xsl:otherwise>—</xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="xhtml:link"><xsl:value-of select="count(xhtml:link)"/></xsl:when>
                        <xsl:otherwise>—</xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
