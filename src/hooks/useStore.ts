import { useStore, mapState, mapGetters, mapActions, mapMutations, createNamespacedHelpers } from 'vuex'
import { computed } from 'vue'

/**
 * @description: 修改state映射
 * @param {*} mapper
 * @param {*} mapFn
 * @return {*}
 */
function useStateMapper(mapper, mapFn) {
    const store = useStore();

    const storeStateFns = mapFn(mapper);

    const storeState = {};
    Object.keys(storeStateFns).forEach(fnKey => {
        // vuex源码中mapState和mapGetters的方法中使用的是this.$store,所以更改this绑定
        const fn = storeStateFns[fnKey].bind({ $store: store });
        storeState[fnKey] = computed(fn)

    })

    return storeState
}

/**
 * @description: 修改action映射
 * @param {*} mapper
 * @param {*} mapFn
 * @return {*}
 */
function useActionMapper(mapper, mapFn) {
    const store = useStore();
    
    const storeActionsFns = mapFn(mapper);

    const storeAction = {};

    Object.keys(storeActionsFns).forEach(fnKey => {
        storeAction[fnKey] = storeActionsFns[fnKey].bind({ $store: store })
    })

    return storeAction
}

/**
 * @description: 修改mutation映射
 * @param {*} mapper
 * @param {*} mapFn
 * @return {*}
 */
function useMutationMapper(mapper, mapFn) {
  const store = useStore();
  
  const storeMutationsFns = mapFn(mapper);

  const storeMutation = {};

  Object.keys(storeMutationsFns).forEach(fnKey => {
    storeMutation[fnKey] = storeMutationsFns[fnKey].bind({ $store: store })
  })

  return storeMutation
}

function checkType(data) {
    return Object.prototype.toString.call(data)
}

/**
 * @description: 封装mapState
 * @param {*} moduleName 模块名称
 * @param {*} mapper state属性集合 ['name', 'age']
 * @returns 
 */
function useState(moduleName, mapper) {
  let mapperFn = mapState;
  
// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapState方法
  if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
      mapperFn = createNamespacedHelpers(moduleName).mapState
  }
  
  return useStateMapper(mapper, mapperFn)
}

/**
 * @description:  
 * @param {*} moduleName 模块名称
 * @param {*} mapper 方法名集合 ['fn1', 'fn2']
 * @returns 
 */
function useGetters(moduleName, mapper) {
  let mapperFn = mapGetters;
  
// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapGetters方法
  if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
      mapperFn = createNamespacedHelpers(moduleName).mapGetters
  }

  return useStateMapper(mapper, mapperFn)
}

/**
 * 
 * @param {*} moduleName 模块名称
 * @param {*} mapper 方法名集合 ['fn1', 'fn2']
 * @returns 
 */
function useActions(moduleName, mapper) {
  let mapperFn = mapActions;
  
// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapActions方法
  if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
      mapperFn = createNamespacedHelpers(moduleName).mapActions
  }

  return useActionMapper(mapper, mapperFn)
}

/**
 * @description:  封装 mapMutations
 * @param {*} moduleName 模块名称
 * @param {*} mapper getters属性集合 ['name', 'age']
 * @returns 
 */
function useMutations(moduleName, mapper) {
  let mapperFn = mapMutations;
  
  // 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapMutations方法
  if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
      mapperFn = createNamespacedHelpers(moduleName).mapMutations
  }

  return useMutationMapper(mapper, mapperFn)
}


export {
  useState,
  useGetters,
  useActions,
  useMutations
}