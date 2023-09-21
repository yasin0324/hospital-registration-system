export default {
    state: {
        doctor: [],
        historyItem: {}
    },
    mutations: {
        getInformation1(state, value) {
            state.doctor=value
        },
        getInformation2(state, value) {
            state.historyItem=value
        },
        checkId(state) {
            for (const item of state.doctor) {
                if (state.historyItem.doctorName === item.name) {
                    state.historyItem.doctorId=item.id
                }
            }
        }
    }
}