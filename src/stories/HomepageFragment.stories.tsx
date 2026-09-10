import type { Meta, StoryObj } from '@storybook/react';
import { HomepageFragment } from '../components/HomepageFragment';

const meta: Meta<typeof HomepageFragment> = {
  title: 'Fragments/HomepageFragment',
  component: HomepageFragment,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomepageFragment>;

export const DefaultLanding: Story = {
  args: {
    onCategorySelect: (slug) => alert(`Category clicked: ${slug}`),
    onClearanceSelect: (cm) => alert(`Clearance chosen: ${cm} cm`),
  },
};

export const CustomClearancePreSet: Story = {
  args: {
    onCategorySelect: (slug) => console.log('Category selected:', slug),
    onClearanceSelect: (cm) => console.log('Clearance selected:', cm),
  },
};
