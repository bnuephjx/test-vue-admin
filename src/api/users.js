import Mock from 'mockjs';
import usersData from '@/mock/users.js';

Mock.mock('/users', 'get',usersData);