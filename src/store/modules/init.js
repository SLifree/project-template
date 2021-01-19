const state = {
    asideList: [],//左侧菜单列表
    tabPanelActive: "",//选项卡选中状态
    tabPanel: [],//页面选项卡
}

const mutations = {
    setAsideList(state, arr) {
        state.asideList = arr || [];
    },
    setTabPanelActive(state, name) {
        state.tabPanelActive = name || '';
    },
    additemToTabPanel(state, item) {
        let length = state.tabPanel.length;
        // 是否有当前项
        let isExist = false;
        let index = 0;
        for (let i = 0; i < length; i++) {
            if (state.tabPanel[i].meta.id !== item.meta.id) continue;
            isExist = true;
            index = i;
            break;
        }
        if (isExist && index === length - 1) return;
        if (isExist) state.tabPanel.splice(index, 1);
        state.tabPanel.push(item);
    },
    deleteItemFromTabPanel(state, name) {
        // 删除全部
        if (name === 'all') {
            state.tabPanel = []
        } else {
            // 删除当前项的位置
            let length = state.tabPanel.length;
            let index = 0;
            for (let i = 0; i < length; i++) {
                if (state.tabPanel[i].meta.id !== name) continue;
                index = i;
                break;

            }
            state.tabPanel.splice(index, 1)
        }
    }
}

const getters = {
    tabPanelLastId(state) {
        const length = state.tabPanel.length;
        if (length <= 0) return "-1";
        else return String(state.tabPanel[length - 1]["meta"]['id']);
    }
}

const actions = {
    changeTabPanelActive({ commit, getters }) {
        const name = getters.tabPanelLastId;
        commit("setTabPanelActive", name)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};