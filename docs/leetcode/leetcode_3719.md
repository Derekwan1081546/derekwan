
# Leetcode-3719. Longest Balanced Subarray I
## 題目說明
給定一個整數數組 `nums`。

若一個子數組 `subarray` 中不同偶數的個數等於不同奇數的個數，則稱該子數組為平衡子數組。

傳回最長平衡子數組的長度。

### 限制條件：
- `1 <= nums.length <= 1500`。
- `1 <= nums[i] <= 10^5`。


## 解題思路

這題的目標是尋找一個符合 **「平衡 (Balanced)」條件** 的最長子陣列。所謂平衡，是指子陣列中 **「相異偶數的數量」** 等於 **「相異奇數的數量」**。
由於題目需要計算的是「相異 (Distinct)」元素的個數，且需要檢查所有可能的子陣列，這是一個典型的 **暴力枚舉 (Brute Force)** 結合 **雜湊集合 (HashSet)** 的問題。

我們可以透過雙層迴圈來遍歷所有可能的子陣列 `nums[i...j]`，並即時計算其平衡狀態：

1.  **資料結構定義**：
    * `even` (HashSet)：用來儲存當前子陣列中出現過的 **偶數**。使用 Set 的特性可以自動過濾重複的數字。
    * `odd` (HashSet)：用來儲存當前子陣列中出現過的 **奇數**。同樣利用 Set 進行去重。
    * `maxLen`：記錄目前為止找到的最長平衡子陣列長度。

2.  **枚舉與狀態更新 (Enumeration & Update)**：
    我們使用雙指針策略（雙層迴圈）來界定子陣列的範圍：

    * **固定起點 ($i$)**：
        * 外層迴圈從 `0` 到 `N-1`。
        * 對於每一個新的起點 `i`，我們必須 **清空** `even` 和 `odd` 集合，重新開始計數。

    * **延伸終點 ($j$)**：
        * 內層迴圈從 `i` 延伸到 `N-1`。
        * **判斷奇偶**：若 `nums[j]` 為偶數，加入 `even`；若為奇數，加入 `odd`。
        * **檢查平衡**：每次加入新元素後，立即比較兩個集合的大小。若 `even.size() == odd.size()`，代表當前子陣列 `nums[i...j]` 是平衡的。

3.  **結果更新**：
    * 當發現平衡子陣列時，計算當前長度 `currentLen = j - i + 1`。
    * 更新全域最大值：`maxLen = max(maxLen, currentLen)`。

4.  **回傳**：
    * 遍歷完所有可能的子陣列後，回傳 `maxLen`。

---

### 複雜度分析

* **時間複雜度：$O(N^2)$**
    我們使用了兩層巢狀迴圈來枚舉所有子陣列。總共會執行約 $\frac{N(N+1)}{2}$ 次迭代。在每次迭代中，HashSet 的插入與大小檢查操作平均為 $O(1)$。

* **空間複雜度：$O(N)$**
    在最壞的情況下（子陣列包含所有元素且皆不重複），`even` 和 `odd` 集合最多需要儲存 $N$ 個元素。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int longestBalanced(vector<int>& nums) {
        int maxLen = 0;
        for (int i = 0; i < nums.size(); i++) {
            unordered_set<int> even;
            unordered_set<int> odd;
            for (int j = i; j < nums.size(); j++) {
                if (nums[j] % 2 == 0) {
                    even.insert(nums[j]);
                } else {
                    odd.insert(nums[j]);
                }
                if (even.size() == odd.size()) {
                    maxLen = max(maxLen, j - i + 1);
                }
            }
        }

        return maxLen;
    }
};
```
