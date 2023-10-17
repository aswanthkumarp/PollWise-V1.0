import {
  person1,
  person2,
  person4,
  person3,
  facebook,
  instagram,
  linkedin,
  twitter,
  PollIcon,
  ShareIcon,
  AnalysisIcon,
} from './assets';

export const navLinks = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'features',
    title: 'Features',
  },
  {
    id: 'product',
    title: 'Product',
  },
  {
    id: 'clients',
    title: 'Clients',
  },
];

export const features = [
  {
    id: 'feature-1',
    icon: PollIcon, 
    title: 'Create Polls',
    content:
      'Easily create engaging polls and gather valuable feedback from your audience.',
  },
  {
    id: 'feature-2',
    icon: ShareIcon, 
    title: 'Share with Ease',
    content:
      'Effortlessly share your polls with friends, colleagues, or on social media.',
  },
  {
    id: 'feature-3',
    icon: AnalysisIcon, 
    title: 'Analyze Results',
    content:
      'Get insightful analytics and data to understand the responses to your polls.',
  },
];

export const testimonialsData = [
  {
    id: 'feedback-1',
    comment:
      "I love this polling platform! It's so easy to use and fun to create polls.",
    name: 'Kath Perry ',
    rating: 5,
    imgSrc: person1,
  },
  {
    id: 'feedback-2',
    comment:
      'Great variety of polls and engaging discussions. Highly recommended!',
    name: 'Mayank Pandey',
    rating: 4,
    imgSrc: person2,
  },
  {
    id: 'feedback-3',
    comment:
      "I've learned so much from participating in polls on this website. It's addictive!",
    name: 'Andrew Stokes',
    rating: 5,
    imgSrc: person3,
  },
  {
    id: 'feedback-4',
    comment:
      'The user interface is clean and intuitive. Poll creation is a breeze.',
    name: 'Deondro Knight',
    rating: 4,
    imgSrc: person4,
  },
];

export const footerLinks = [
  {
    title: 'Useful Links',
    links: [
      {
        name: 'Content',
        link: 'https://www.hoobank.com/content/',
      },
      {
        name: 'How it Works',
        link: 'https://www.hoobank.com/how-it-works/',
      },
      {
        name: 'Create',
        link: 'https://www.hoobank.com/create/',
      },
      {
        name: 'Explore',
        link: 'https://www.hoobank.com/explore/',
      },
      {
        name: 'Terms & Services',
        link: 'https://www.hoobank.com/terms-and-services/',
      },
    ],
  },
];

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: instagram,
    link: 'https://www.instagram.com/',
  },
  {
    id: 'social-media-2',
    icon: facebook,
    link: 'https://www.facebook.com/',
  },
  {
    id: 'social-media-3',
    icon: twitter,
    link: 'https://www.twitter.com/',
  },
  {
    id: 'social-media-4',
    icon: linkedin,
    link: 'https://www.linkedin.com/',
  },
];
