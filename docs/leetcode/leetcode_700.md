
# Leetcode-700. Search in a Binary Search Tree
## 題目說明
給定一個二元搜尋樹（BST）的根節點和一個整數值 `val`。

在 `BST` 中找到值等於 `val` 的節點，並傳回以該節點為根的子樹。如果這樣的節點不存在，則傳回 `null`。

### 限制條件：

- 樹中的節點數在 `[1, 5000]` 範圍內。
- `1 <= Node.val <= 10^7`。
- `root` 是二元搜尋樹。
- `1 <= val <= 10^7`。

## 解題思路
- 從根節點開始：
    用一個指標 root 遍歷樹。
    迭代搜尋：
    若 `root == nullptr` → 搜尋到空節點，表示 `BST` 中沒有這個值 → 回傳 `nullptr`
    若 `root->val == val` → 找到目標 → 回傳這個節點
    若 `val > root->val` → 目標在右子樹 → `root = root->right`
    若 `val < root->val` → 目標在左子樹 → `root = root->left`
    迴圈結束條件：
    當指標變成 `nullptr`，代表樹中不存在該值，回傳 `nullptr`。

- 時間複雜度
    - 平均情況（DP 狀態平均分散）
        每個格子需要處理 `k` 種餘數狀態，共有 `m × n` 個格子
        → `O(m × n × k)`

    - 最壞情況（DP 狀態完全展開）
        狀態仍然需要處理所有格子的所有餘數
        → `O(m × n × k)`（同平均）

    - 空間複雜度
        使用三維 DP
        → O(m × n × k)

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
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root != nullptr) {
            if (root->val == val) {
                return root;
            } else if (root->val < val) {
                root = root->right;
            } else {
                root = root->left;
            }
        }
        return nullptr;
    }
};
```