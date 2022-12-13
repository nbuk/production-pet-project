import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {ArticlesRecommendationsList} from './ArticlesRecommendationsList';
import {Article} from "entities/Article";
import {StoreDecorator} from "shared/config/storybook/StoreDecorator";

const article: Article = {
    id: "1",
    title: 'test title',
    img: '',
    type: [],
    user: { id: '1', username: 'admin' },
    blocks: [],
    createdAt: '12.12.2022',
    views: 123,
    subtitle: 'subtitle'
}

export default {
    title: 'features/ArticlesRecommendationsList',
    component: ArticlesRecommendationsList,
    parameters: {
      mockData: [
        {
          url: __API__ + '/articles?_limit=3',
          method: 'GET',
          status: 200,
          response: [
            {...article, id: '1'},
            {...article, id: '2'},
            {...article, id: '3'},
          ]
        }
      ]
    }
} as ComponentMeta<typeof ArticlesRecommendationsList>;

const Template: ComponentStory<typeof ArticlesRecommendationsList> = (args) => <ArticlesRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.decorators = [StoreDecorator({})];