
# Leetcode-108. Convert Sorted Array to Binary Search Tree
## 題目說明
給定一個按升序排列的整數數組 `nums`，將其轉換為高度平衡 `height-balanced` 的二元搜尋樹。
### 限制條件：
- `1 <= nums.length <= 10^4`。

- `-10^4 <= nums[i] <= 10^4`。

- `nums` 已依嚴格升序排序。


## 解題思路

這題的目標是將一個 **已排序的陣列 (Sorted Array)** 轉換為一棵 **高度平衡的二元搜尋樹 (Height-Balanced BST)**。
由於陣列已經排序，為了保證樹的平衡性（即左右子樹高度差不超過 1），我們應該始終選擇當前區間的 **中間元素** 作為根節點。這是一個典型的 **分治法 (Divide and Conquer)** 應用。



我們可以定義一個遞迴函式 `buildBST(left, right)` 來構建子樹：

1.  **選擇根節點 (Selection)**：
    * 找出當前範圍 `[left, right]` 的中間索引 `mid`。
    * 為了避免整數溢位 (Integer Overflow)，計算方式採用 `mid = left + (right - left) / 2`。
    * 建立一個新的 `TreeNode`，其值為 `nums[mid]`。

2.  **遞迴構建 (Recursion)**：
    * **左子樹**：使用 `mid` 左邊的區間 `[left, mid - 1]` 遞迴呼叫函式，並將結果接在 `node->left`。
    * **右子樹**：使用 `mid` 右邊的區間 `[mid + 1, right]` 遞迴呼叫函式，並將結果接在 `node->right`。

3.  **終止條件 (Base Case)**：
    * 當 `left > right` 時，代表區間內沒有元素，無法構成節點，回傳 `nullptr`。

---

### 複雜度分析

* **時間複雜度：$O(N)$**
    每個元素都會被訪問一次且僅被創建為一個節點。遞迴過程中沒有重複計算，因此時間複雜度與陣列長度成正比。

* **空間複雜度：$O(\log N)$**
    雖然我們沒有使用額外的資料結構來儲存數據，但遞迴呼叫會佔用 **系統堆疊 (Stack Space)**。
    由於我們總是選擇中間點作為根，生成的樹是高度平衡的，樹的高度為 $\log N$，因此遞迴深度為 $O(\log N)$。
## 參考解法
```cpp title="C++ " showLineNumbers
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
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return buildBST(nums, 0, nums.size() - 1);
    }

private:
    TreeNode* buildBST(const vector<int>& nums, int left, int right) {
        // 終止條件：如果左邊界大於右邊界，代表這區間沒有數字了
        if (left > right) {
            return nullptr;
        }

        // 選擇中間點作為當前子樹的根節點
        // 使用 left + (right - left) / 2 是為了防止整數溢位 (Overflow)
        int mid = left + (right - left) / 2;

        TreeNode* node = new TreeNode(nums[mid]);

        // 遞迴處理左右兩半
        node->left = buildBST(nums, left, mid - 1);
        node->right = buildBST(nums, mid + 1, right);

        return node;
    }
};
```