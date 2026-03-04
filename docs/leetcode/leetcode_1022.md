
# Leetcode-1022. Sum of Root To Leaf Binary Numbers
## 題目說明
給定一個二元樹的根節點，其中每個節點的值均為 0 或 1。每條從根節點到葉節點的路徑都代表一個二進制數，從最高有效位元開始。

例如，如果路徑為 `0 -> 1 -> 1 -> 0 -> 1`，則其二進位表示為 01101，即 13。

對於樹中的所有葉子節點，考慮從根節點到該葉節點的路徑所代表的二進制數。傳回這些二進制數的總和。

測試案例的產生方式使得答案能夠以 `32` 位元整數表示。

### 限制條件：
- 樹中的節點數在 `[1, 1000]` 範圍內。

- `Node.val` 的值為 `0` 或 `1`。

## 解題思路

這題要求我們走過每一條從「根節點」到「葉子節點」的路徑，將路徑上的數字當作二進位字串並轉為十進位，最後求所有路徑的總和。

### 1. 核心邏輯：二進位數的位移處理
當我們沿著路徑向下移動時，之前的數值會往左移動一位（權重翻倍），並加上當前節點的值。
* **數學公式**：$currentSum = (currentSum \times 2) + node.val$
* **位元運算**：在 C++ 中，使用 `(currentSum << 1) | node->val` 或 `(currentSum << 1) + node->val` 效能更佳，效果相同。

### 2. 演算法步驟 (DFS 遞迴法)
1.  **初始呼叫**：從根節點開始，初始路徑和為 `0`。
2.  **節點處理**：
    * 如果目前節點為空 (`nullptr`)，代表這條路徑無效，回傳 `0`。
    * 將目前的 `currentSum` 左移一位並加上當前節點的 `val`。
3.  **抵達終點**：
    * 檢查是否為**葉子節點**（左右子樹皆為空）。如果是，代表一條完整的二進位路徑已形成，直接回傳 `currentSum`。
4.  **遞迴分支**：
    * 若非葉子節點，則分別向左子樹與右子樹進行 DFS 搜尋，並將兩者回傳的結果相加。

---

### 3. 圖解範例
假設有一條路徑為 `1 -> 0 -> 1`：
- **根節點 (1)**：`currentSum = (0 << 1) + 1 = 1`
- **第二層 (0)**：`currentSum = (1 << 1) + 0 = 2` (二進位 $10_2$)
- **葉節點 (1)**：`currentSum = (2 << 1) + 1 = 5` (二進位 $101_2$)



---

### 4. 效能分析
| 維度 | 複雜度 | 說明 |
| :--- | :--- | :--- |
| **時間複雜度** | $O(N)$ | 每個節點恰好被訪問一次，$N$ 為二元樹的節點總數。 |
| **空間複雜度** | $O(H)$ | $H$ 為樹的高度。遞迴呼叫時產生的堆疊空間（Stack Space），最差情況下（斜樹）為 $O(N)$。 |

---

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
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int sumRootToLeaf(TreeNode* root) {
        return dfs(root, 0);
    }
    int dfs(TreeNode* node, int currentSum) {
        // 1. 基本情況：如果節點為空，回傳 0
        if (node == nullptr) return 0;

        // 2. 更新當前路徑的數值：先左移一位 (相當於 * 2) 再加上當前節點值
        currentSum = (currentSum << 1) + node->val;

        // 3. 如果是葉子節點 (Leaf)，回傳目前計算出的二進制總和
        if (node->left == nullptr && node->right == nullptr) {
            return currentSum;
        }

        // 4. 遞迴計算左右子樹並加總
        return dfs(node->left, currentSum) + dfs(node->right, currentSum);
    }
};
```