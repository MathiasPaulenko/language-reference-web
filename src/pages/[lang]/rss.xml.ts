import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { interfaceLocales, type LocaleCode } from '../../config/languages';
import { getUI } from '../../i18n';
import { localePath } from '../../lib/utils';

export const getStaticPaths = (() =>
  interfaceLocales.map((locale) => ({
    params: { lang: locale.code },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
  const lang = context.params.lang as LocaleCode;
  const ui = getUI(lang);
  const site = context.site?.toString() ?? 'https://grammarnavigator.com';

  const allTopics = await getCollection('topics');
  const localeTopics = allTopics
    .filter((t) => t.data.locale === lang && !t.data.draft)
    .sort((a, b) => {
      const aDate = a.data.lastUpdated ? new Date(a.data.lastUpdated).getTime() : 0;
      const bDate = b.data.lastUpdated ? new Date(b.data.lastUpdated).getTime() : 0;
      return bDate - aDate;
    })
    .slice(0, 20);

  return rss({
    title: `${ui.site.name} — ${ui.site.tagline}`,
    description: ui.site.tagline,
    site,
    items: localeTopics.map((topic) => ({
      title: topic.data.title,
      description: topic.data.description,
      link: new URL(localePath(lang, `topics/${topic.data.topic}`), site).toString(),
      pubDate: topic.data.lastUpdated ? new Date(topic.data.lastUpdated) : new Date(),
    })),
    customData: `<language>${lang}</language>`,
  });
};
