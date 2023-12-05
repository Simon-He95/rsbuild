import type { RsbuildPlugin } from '@rsbuild/core';
import glob from 'fast-glob';
import path from 'path';
import type { Group } from './components/Overview';

const camelCase = (input: string): string =>
  input.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());

export const rsbuildPluginOverview: RsbuildPlugin = {
  name: 'rsbuild-doc:overview',

  async setup(api) {
    const root = path.join(__dirname, '../docs/en/config/');
    const globPath = path.join(root, '**/*.{mdx,md}');

    const files = await glob(globPath);
    const groups: Group[] = [];

    files.forEach((file) => {
      file = file.replace(root, '');
      file = file.replace(/\.mdx?/, '');

      const pair = file.split('/');
      if (pair.length < 2) {
        return;
      }

      const group = groups.find((group) => group.name === pair[0]);
      const item = {
        text: `${pair[0]}.${camelCase(pair[1])}`,
        link: `/config/${file}`,
      };
      if (group) {
        group.items.push(item);
      } else {
        groups.push({
          name: pair[0],
          items: [item],
        });
      }
    });

    const order = [
      'source',
      'output',
      'html',
      'server',
      'dev',
      'tools',
      'performance',
      'plugins',
    ];

    groups.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    api.modifyRsbuildConfig((config, { mergeRsbuildConfig }) => {
      return mergeRsbuildConfig(config, {
        source: {
          define: {
            OVERVIEW_GROUPS: JSON.stringify(groups),
          },
        },
      });
    });
  },
};
