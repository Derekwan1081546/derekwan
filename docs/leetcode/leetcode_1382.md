
# Leetcode-1382. Balance a Binary Search Tree
## 題目說明
給定一個二元搜尋樹的根節點，傳回一個具有相同節點值的平衡二元搜尋樹。如果存在多個答案，則傳回其中任一個。

如果一個二元搜尋樹中每個節點的兩個子樹的深度差異不超過 1，則稱該二元搜尋樹是平衡的。

### 限制條件：
- 樹中的節點數在 `[1, 10^4]` 範圍內。
- `1 <= Node.val <= 10^5`。


## 解題思路

這道題的核心在於利用 **二元搜尋樹 (BST)** 的特性進行重組。我們可以將問題拆解為兩個簡單的步驟：

1.  **數據提取 (Extraction)**：
    由於 BST 的 **中序遍歷 (Inorder Traversal)** 必定會產生一個 **嚴格遞增的有序數列**。我們利用這一點，將整棵樹「壓扁」存入一個陣列 (`vector`) 中。這一步消除了原本樹結構不平衡的狀態。

2.  **樹的重建 (Reconstruction)**：
    擁有有序陣列後，要建立一棵平衡 BST，最佳策略是 **總是選擇中間的元素作為根節點**。
    * **根節點**：陣列的中間元素 `mid`。
    * **左子樹**：由 `mid` 左邊的子陣列遞迴構建。
    * **右子樹**：由 `mid` 右邊的子陣列遞迴構建。
    這種 **分治法 (Divide and Conquer)** 保證了左右子樹的節點數量差不會超過 1，從而達到高度平衡。

---

### 複雜度分析

* **時間複雜度：$O(N)$**
    * 中序遍歷需要訪問每個節點一次：$O(N)$。
    * 重建樹的過程也是訪問每個節點一次：$O(N)$。
    * 總和：$O(N)$。

* **空間複雜度：$O(N)$**
    * 我們需要一個額外的陣列來儲存 $N$ 個節點的值。
    * 遞迴建樹的堆疊深度在平衡狀態下為 $O(\log N)$。
    * 總空間主要由陣列決定，為 $O(N)$。

## 參考解法
```cpp title="C++" showLineNumbers
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 * int val;
 * TreeNode *left;
 * TreeNode *right;
 * TreeNode() : val(0), left(nullptr), right(nullptr) {}
 * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class Solution {
public:
    vector<int> sortedNodes;

    // 步驟 1: 中序遍歷，收集節點值
    void inorder(TreeNode* root) {
        if (!root)
            return;
        inorder(root->left);
        sortedNodes.push_back(root->val);
        inorder(root->right);
    }

    // 步驟 2: 遞迴構建平衡 BST
    TreeNode* buildBalancedBST(int left, int right) {
        if (left > right)
            return nullptr;

        // 取中間點作為根節點，確保平衡
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(sortedNodes[mid]);

        // 遞迴構建左右子樹
        root->left = buildBalancedBST(left, mid - 1);
        root->right = buildBalancedBST(mid + 1, right);

        return root;
    }

    TreeNode* balanceBST(TreeNode* root) {
        sortedNodes.clear();
        inorder(root);                                      // 轉成有序陣列
        return buildBalancedBST(0, sortedNodes.size() - 1); // 重建
    }
};
```

