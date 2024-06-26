define([], function () {
  const menuItems = [
    {
      text: "首页",
      icon: "shouye2",
      url: "#!home",
      key: "#!home",
    },
    {
      text: "消息",
      icon: "xiaoxi2",
      url: "#!message",
      key: "#!message",
    },
    {
      text: "日历",
      icon: "rili2",
      url: "#!calendar",
      key: "#!calendar",
    },
    {
      text: "项目",
      icon: "xiangmu2",
      url: "#!projects",
      key: "#!projects",
    },
    {
      text: "工作台",
      icon: "gongzuotai2",
      url: "#!application",
      key: "#!application",
    },
    {
      text: "联系人",
      icon: "tongxunlu2",
      url: "#!contact",
      key: "#!contact",
    },
    {
      text: "云盘",
      icon: "yunpan2",
      url: "#!cloud",
      key: "#!cloud",
    },
    {
      text: "统计",
      icon: "tongji2",
      url: "#!statistics",
      key: "#!statistics",
    },

  ];

  const bfs = (node, action, filter, copyAction, childrenField) => {
    childrenField = childrenField || "children";
    const walkAndCopy = (tree, depth = 1) => {
      const queue = [];
      action(tree, depth);
      if (filter(tree)) {
        let copy = {};
        copy = copyAction(tree);
        if (tree[childrenField]) {
          copy[childrenField] = [];
          queue.push({
            nodes: tree[childrenField],
            depth: depth + 1,
            copyNodes: copy[childrenField],
            parentNode: tree,
          });
        } else {
          copy[childrenField] = null;
        }
        while (queue.length) {
          const item = queue.pop();
          item.nodes &&
            item.nodes.forEach((node) => {
              action(node, item.depth, item.parentNode);
              if (filter(node, item.parentNode)) {
                let copyNode = {};
                copyNode = copyAction(node);
                if (node[childrenField]) {
                  copyNode[childrenField] = [];
                  queue.push({
                    nodes: node[childrenField],
                    depth: item.depth + 1,
                    copyNodes: copyNode[childrenField],
                    parentNode: node,
                  });
                }
                item.copyNodes.push(copyNode);
              }
            });
        }
        return copy;
      } else {
        return false;
      }
    };
    return walkAndCopy(node);
  };

  return function processMenu() {
    let items = [];

    let highlightMap = {};
    menuItems.forEach((item) => {
      const walkeditem = bfs(
        item,
        (it, depth, parent) => {
          let highlight = it.highlight || it.url;
          if (!it.highlight && parent && parent.hideChildrenInMenu === true) {
            highlight = highlightMap[parent.url];
          }
          highlightMap[it.url] = highlight;
        },
        (it, parent) => {
          if (it.hideInMenu === true) {
            return false;
          }
          if (parent && parent.hideChildrenInMenu === true) {
            return false;
          }
          return true;
        },
        (it) => {
          return nomui.utils.extend({}, it);
        },
        "items"
      );
      walkeditem !== false && items.push(walkeditem);
    });

    return { items, highlightMap };
  };
});
