
# Leetcode-3634. Minimum Removals to Balance Array
## 題目說明
給定一個整數數組 `nums` 和一個整數 `k`。

如果一個陣列的最大元素的值至多是最小元素的 `k` 倍，則稱該數組為平衡數組。

你可以從 `nums` 中移除任意數量的元素，但不能使陣列為空。

傳回使剩餘數組保持平衡所需的最小移除元素數。

注意：長度為 `1` 的陣列被認為是平衡的，因為它的最大值和最小值相等，並且該條件始終成立。

### 限制條件：
- `1 <= nums.length <= 10^5`。
- `1 <= nums[i] <= 10^9`。
- `1 <= k <= 10^5`。

## 解題思路

這題的目標是透過移除最少的元素，使得剩餘陣列滿足 `max <= k * min`。我們可以將問題反向思考為：**在原陣列中找出最長的一個子序列，使其滿足平衡條件**。

1.  **排序 (Sorting)**：
    首先將陣列由小到大排序。排序後，對於任意連續子陣列 `nums[i...j]`，其最小值為 `nums[i]`，最大值為 `nums[j]`。這將原本複雜的極值查找簡化為頭尾檢查。

2.  **滑動窗口 (Sliding Window)**：
    我們維護一個區間 `[left, right]`：
    * **擴展**：移動 `right` 指針來納入新的最大值。
    * **收縮**：如果當前區間不滿足 `nums[right] <= nums[left] * k`，說明最小值 `nums[left]` 太小了，無法配合當前的 `nums[right]`。此時我們將 `left` 指針向右移，直到區間再次合法。
    * **記錄**：在每一步都計算當前窗口長度，並記錄下出現過的最大長度 `maxKept`。

3.  **計算結果**：
    最終答案即為 `陣列總長度 - maxKept`。

---

### 複雜度分析

* **時間複雜度：$O(N \log N)$**
    主要消耗在排序上。滑動窗口的部分雖然有兩個指針，但每個元素最多被訪問兩次（進窗口一次、出窗口一次），所以是 $O(N)$。整體由排序主導。

* **空間複雜度：$O(1)$** (或 $O(\log N)$)
    除了儲存輸入和少數變數外，我們不需要額外的陣列空間（取決於排序演算法的實作細節）。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int minRemoval(vector<int>& nums, int k) {
        // Step 1: 排序
        // 時間複雜度 O(N log N)
        sort(nums.begin(), nums.end());

        int n = nums.size();
        int left = 0;
        int maxKept = 0;

        // Step 2: 滑動窗口
        // 時間複雜度 O(N)
        for (int right = 0; right < n; right++) {
            // 當條件不滿足時 (最大值 > k倍的最小值)，縮小窗口左邊界
            // 注意：要用 long long 防止 nums[left] * k 溢位
            while ((long long)nums[right] > (long long)nums[left] * k) {
                left++;
            }

            // 更新目前能保留的最大數量
            maxKept = max(maxKept, right - left + 1);
        }

        // 答案 = 總數 - 最多能保留的數量
        return n - maxKept;
    }
};
```
