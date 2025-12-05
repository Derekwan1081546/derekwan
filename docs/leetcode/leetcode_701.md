
# Leetcode-701. Insert into a Binary Search Tree
## 題目說明
給定一個二元搜尋樹（BST）的根節點和一個要插入到樹中的值。傳回插入後 `BST` 的根節點。保證新值不存在於原 `BST` 中。

請注意，只要插入後樹仍然是 `BST`，就可能有多種有效的插入方式。你可以返回其中任何一種。

### 限制條件：
- 樹中的節點數將在 `[0, 104]` 範圍內。
- `-10^8 <= Node.val <= 10^8`。
- `Node.val` 的所有值都是唯一的。
- `-10^8 <= val <= 10^8`。
- 可以保證 `val` 不存在於原始二元搜尋樹中。

## 解題目標
給定一棵 二元搜尋樹（BST） 和一個數字 `val`，將這個值插入 `BST` 中，並回傳最後的根節點 `root`。

`BST` 特性：

左子樹所有值 < 根節點

右子樹所有值 > 根節點

每個子樹也是 `BST`

## 解題思路

判斷樹是否為空
如果根節點 `root` 是空的，表示整棵樹還沒有任何節點，直接建立一個新節點並回傳它即可。

使用兩個指標遍歷 `BST`

`curr`：用來從根節點一路往下搜尋，找出適合插入的位置。

`parent`：記錄 `curr` 的父節點，以便最後把新節點掛上去。

根據 `BST` 性質往下搜尋
若 `val` 小於目前節點的值，往左子樹走；
若 `val` 大於或等於目前節點的值，往右子樹走。
不斷更新 `curr`，直到走到一個空的位置（`nullptr`）。

找到空位時，把新節點接上父節點
當 `curr` 變成 `nullptr` 時，`parent` 就是新節點應該掛載的位置。

如果新值小於父節點 → 掛到父節點的左子樹

如果新值大於父節點 → 掛到父節點的右子樹

回傳整棵樹的根節點
在迭代過程中根節點沒有改變，所以最後直接回傳 `root`。


- 時間複雜度
    - 平均情況（樹比較平衡）：
        每次比較可以把搜尋範圍縮小一半
        樹高度 `h ≈ log₂(n) → O(log n)`

    - 最壞情況（樹退化成鏈表，例如每個節點只有右子樹）：
        需要遍歷所有節點
        `O(n)`

- 空間複雜度
    - 迭代版本：`O(1)` → 只使用了指標，不額外分配空間
    - 若使用遞迴版本：`O(h)` → 呼叫堆疊需要高度 `h` 的空間

## 參考解法
```cpp title="C++" showLineNumbers
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        TreeNode* newnode = new TreeNode(val);
        TreeNode* curr = root;
        TreeNode* parent = nullptr;
        if (root == nullptr)
            return newnode;
        while (curr != nullptr) {
            parent = curr;
            if (curr->val > val) {
                curr = curr->left;
            } else {
                curr = curr->right;
            }
        }
        if (parent->val > val) {
            parent->left = newnode;
        } else {
            parent->right = newnode;
        }
        return root;
    }
};
```