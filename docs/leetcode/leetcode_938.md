
# Leetcode-938. Range Sum of BST
## 題目說明
給定二元搜尋樹(BST)的根節點和兩個整數 `low` 和 `high`，傳回值在包含範圍 `[low, high]` 內的所有節點的值總和。
### 限制條件：
樹中的節點數在 `[1, 2 * 10^4]` 範圍內。
- `1 <= Node.val <= 10^5`
- `1 <= low <= high <= 10^5`
所有 `Node.val` 都是唯一的。
## 解題思路
- `traverse` 函式是遞歸遍歷整棵樹的輔助函式。如果節點值位於 `[low, high]` 之間，將其加入結果向量 `arr` 中。
- `rangeSumBST` 函式使用 `traverse` 遍歷整棵樹，然後計算並返回符合條件的節點值的總和。
這段程式通過遞歸遍歷樹的每個節點，確保不漏掉任何在範圍內的節點值，並最終返回這些值的和
## 參考解法1
```cpp title="C++" showLineNumbers {4}
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
    void traverse(TreeNode* root, int low, int high, vector<int>& arr) {
        if (root == nullptr) {
            return; // 如果節點為空，直接返回
        }

        // 如果當前節點的值在範圍內，則將其加入 arr
        if (root->val >= low && root->val <= high) {
            arr.push_back(root->val);
        }

        // 遞歸遍歷左子樹
        traverse(root->left, low, high, arr);

        // 遞歸遍歷右子樹
        traverse(root->right, low, high, arr);
    }

    int rangeSumBST(TreeNode* root, int low, int high) {
        vector<int> arr;                // 用於存儲符合條件的節點值
        traverse(root, low, high, arr); // 遍歷整個樹並收集符合條件的值

        // 計算 arr 中所有元素的和
        int sum = 0;
        for (auto& a : arr) {
            sum += a;
        }

        return sum; // 返回總和
    }
};
```
## 解題思路
基本結構：`rangeSumBST` 函式是一個遞歸函式，用於遍歷二元搜索樹。如果當前節點為 `nullptr`，則返回 `0`，表示沒有更多的節點需要處理。

範圍檢查：

如果當前節點的值在範圍 `[low, high]` 之內，將其值加入總和 `sum`。
遞歸遍歷：

- 左子樹：如果當前節點的值大於 `low`，則有可能在左子樹中找到符合範圍的值，因此遞歸遍歷左子樹。
- 右子樹：如果當前節點的值小於 `high`，則有可能在右子樹中找到符合範圍的值，因此遞歸遍歷右子樹。

最後返回結果：將所有符合條件的節點值累加後，返回總和。
## 參考解法2
```cpp title="C++" showLineNumbers {4}
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
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (root == nullptr) {
            return 0; // 如果節點為空，直接返回
        }

        int sum = 0; //總和

        // 如果當前節點的值在範圍內，將其加入總和
        if (root->val >= low && root->val <= high) {
            sum += root->val;
        }

        // 如果當前節點的值大於 low，說明左子樹有可能有符合條件的值
        if (root->val > low) {
            sum += rangeSumBST(root->left, low, high);
        }

        // 如果當前節點的值小於 high，說明右子樹有可能有符合條件的值
        if (root->val < high) {
            sum += rangeSumBST(root->right, low, high);
        }

        return sum;
    }
};
```