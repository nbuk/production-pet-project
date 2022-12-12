import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {ArticlesRecommendationsList} from './ArticlesRecommendationsList';

export default {
    title: 'features/ArticlesRecommendationsList',
    component: ArticlesRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesRecommendationsList>;

const Template: ComponentStory<typeof ArticlesRecommendationsList> = (args) => <ArticlesRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};