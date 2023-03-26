import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppsAndSites from '../pages/components/AppsAndSites'

export default {
  title: 'Example/AppsAndSites',
  component: AppsAndSites,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppsAndSites>

const Template: ComponentStory<typeof AppsAndSites> = (args) => <AppsAndSites {...args} />

export const Primary = Template.bind({})
Primary.args = {
  url: "https://google.com",
  title: "dummy",
  text: "hogehoge",
  technologies: ["HTML", "CSS"]
}
