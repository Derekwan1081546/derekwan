
# Leetcode-110. Balanced Binary Tree
## 題目說明
給定一棵二元樹，判斷它是否高度平衡。
### 限制條件：
- 樹中的節點數在 `[0, 5000]` 範圍內。
- `-10^4 <= Node.val <= 10^4`。

## 解題思路

使用 **遞迴 (Recursion)**，因為判斷平衡需要知道「左子樹高度」與「右子樹高度」，這是一個典型的 **後序遍歷 (Post-order Traversal)** 應用（左 -> 右 -> 中）。

1.  **設計輔助函數 `checkHeight`**：
    這個函數不僅負責計算高度，還負責判斷是否平衡。我們利用 `-1` 作為特殊標記，代表「此子樹已經不平衡」。

2.  **由下而上 (Bottom-Up) 的邏輯**：
    * 先深入遞迴取得左子樹的高度。
    * 如果左子樹回傳 `-1`，代表下方已經不平衡，我們不需要再算右邊，直接回傳 `-1` (剪枝)。
    * 接著取得右子樹的高度，同樣檢查是否為 `-1`。
    * 如果左右都正常，檢查 `abs(左高 - 右高)`。若大於 1，回傳 `-1`。
    * 若一切正常，回傳 `max(左, 右) + 1` 作為當前節點的高度。

3.  **主函數**：
    只需呼叫 `checkHeight(root)`，檢查回傳值是否為 `-1` 即可。

---

### 複雜度分析

* **時間複雜度：$O(N)$**
    每個節點只會被訪問一次。如果有任何子樹不平衡，我們會提早結束該分支的計算，效率極高。
    
* **空間複雜度：$O(H)$**
    其中 $H$ 是樹的高度（遞迴堆疊的深度）。
    * 平衡樹：$O(\log N)$
    * 最差情況（一直線）：$O(N)$
## 參考解法
```cpp title="C++ " showLineNumbers
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
    // 輔助函數：回傳高度。如果發現不平衡，直接回傳 -1
    int checkHeight(TreeNode* node) {
        // 1. 終止條件：空節點高度為 0
        if (node == nullptr) {
            return 0;
        }

        // 2. 遞迴計算左子樹高度
        int leftH = checkHeight(node->left);
        if (leftH == -1)
            return -1; // 剪枝：如果左邊已經壞了，直接往上回報 -1

        // 3. 遞迴計算右子樹高度
        int rightH = checkHeight(node->right);
        if (rightH == -1)
            return -1; // 剪枝：如果右邊已經壞了，直接往上回報 -1

        // 4. 檢查當前節點是否平衡
        if (abs(leftH - rightH) > 1) {
            return -1; // 高度差超過 1，標記為不平衡
        }

        // 5. 如果平衡，回傳當前高度 (左右較大者 + 1)
        return max(leftH, rightH) + 1;
    }

    bool isBalanced(TreeNode* root) {
        // 只要結果不是 -1，就代表是平衡的
        return checkHeight(root) != -1;
    }
};
```