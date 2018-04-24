import _ from 'lodash';

import {adminRoutes,normalRoues} from '@/mock/router';

const state = {
    'addRoutes': []
};

const mutations = {
    'SET_ROUTERS':function(state,adds){
        state.addRoutes.length = 0;
        state.addRoutes = _.concat(state.addRoutes,adds);
    }
};

const actions = {
    'getRoutes':function({commit},roles){
        if (_.indexOf(roles, 'admin') !== -1) {
            commit('SET_ROUTERS',adminRoutes());
        } else {
            commit('SET_ROUTERS',normalRoues());
        }
    }
};

var asyncRouter = {
    'namespaced': true,
    state,
    mutations,
    actions
};

export default asyncRouter;