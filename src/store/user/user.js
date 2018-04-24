import _ from 'lodash';
import Cookie from 'js-cookie';

const state={
 'isLogin':false
};

const mutations = {
 'SET_USER':function(state,userData){
 state = _.assign(state,userData);
 Cookie.set('accountData', state);
},
'REMOVE_USER':function(state){
 state = _.assign(state,{
   'isLogin':false
 });
 Cookie.remove('accountData');
}
};

const actions = {
 'setUser':function({commit},userData){
   commit('SET_USER',userData);
 },
 'removeUser':function({commit}){
   commit('REMOVE_USER');
 }
};

const user ={
 'namespaced': true,
 state,
 mutations,
 actions
};

export default user;