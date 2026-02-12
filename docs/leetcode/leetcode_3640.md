
# Leetcode-3640. Trionic Array II
## 題目說明
給定一個長度為 `n` 的整數數組 `nums`。

三元子數組是指 `nums[l...r]` 中連續的子數組（其中 `0 <= l < r < n`），存在索引 `l < p < q < r`，使得：

`nums[l...p]` 嚴格遞增，

`nums[p...q]` 嚴格遞減，

`nums[q...r]` 嚴格遞增。

傳回 `nums` 中任意三元子數組的最大和。

### 限制條件：
- `4 <= n = nums.length <= 10^5`。

- `-10^9 <= nums[i] <= 10^9`。

- 保證至少存在一個三元子數組。

## 解題思路

這題的目標是尋找一個符合 **「Trionic」結構**（嚴格遞增 $\to$ 嚴格遞減 $\to$ 嚴格遞增，類似「N」字形）的子序列，並使該子序列的元素總和最大。
由於這涉及到序列的狀態轉換（上升、下降、再上升），這是一個典型的 **動態規劃 (Dynamic Programming, DP)** 問題。

我們可以定義三個狀態陣列來記錄以 `nums[i]` 結尾時的最大總和：

1.  **狀態定義**：
    * `s1[i]` (Stage 1)：處於 **第一段遞增** 階段。以 `i` 結尾的最大和。
    * `s2[i]` (Stage 2)：處於 **中間遞減** 階段。以 `i` 結尾的最大和。
    * `s3[i]` (Stage 3)：處於 **第二段遞增** 階段。以 `i` 結尾的最大和（也就是最終目標）。

2.  **狀態轉移 (Transitions)**：
    對於每一個位置 `i`，我們根據它與前一個數 `nums[i-1]` 的大小關係來更新狀態：

    * **若是遞增 (`nums[i] > nums[i-1]`)**：
        * **更新 S1**：我們可以延續前一段上升 (`s1[i-1] + nums[i]`)，或者重新開始一段新的上升 (`nums[i-1] + nums[i]`)，取較大者。
        * **更新 S3**：這代表「谷底反彈」或「延續第二段上升」。我們可以從 S2 轉移過來（S2 結束，S3 開始），或者延續 S3。即 `s3[i] = max(s2[i-1], s3[i-1]) + nums[i]`。

    * **若是遞減 (`nums[i] < nums[i-1]`)**：
        * **更新 S2**：這代表「到達峰值後下降」或「延續下降」。我們可以從 S1 轉移過來（S1 結束，S2 開始），或者延續 S2。即 `s2[i] = max(s1[i-1], s2[i-1]) + nums[i]`。

3.  **初始化與邊界**：
    * 所有狀態初始化為 `LLONG_MIN`，代表該路徑尚未達成。
    * 若 `nums[1] > nums[0]`，則可以初始化第一個上升段 `s1[1]`。

4.  **結果**：
    * 每次計算完 `s3[i]`，若該值有效，則更新全域最大值 `maxSum`。
    * 如果遍歷結束後 `maxSum` 仍為初始值，代表無法組成 Trionic 結構，回傳 -1。

---

### 複雜度分析

* **時間複雜度：$O(N)$**
    我們只需遍歷陣列一次 (`for` 迴圈)，每次進行常數次的大小比較與加法運算。

* **空間複雜度：$O(N)$**
    使用了三個長度為 $N$ 的陣列 (`s1`, `s2`, `s3`) 來儲存狀態。
    *(註：此題可以進一步優化為 $O(1)$ 空間，因為每個狀態只依賴於 `i-1`，只需使用變數紀錄上一輪的狀態即可。)*

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    long long maxSumTrionic(vector<int>& nums) {
        int n = nums.size();
        if (n < 4)
            return -1;

        // 使用 LLONG_MIN 作為「無效狀態」的標記
        vector<long long> s1(n, LLONG_MIN);
        vector<long long> s2(n, LLONG_MIN);
        vector<long long> s3(n, LLONG_MIN);

        long long maxSum = LLONG_MIN;

        // 初始第一個遞增對
        if (nums[1] > nums[0]) {
            s1[1] = (long long)nums[0] + nums[1];
        }

        for (int i = 2; i < n; ++i) {
            // S1: 嚴格遞增
            if (nums[i] > nums[i - 1]) {
                // 如果前一個也是遞增，接上去；否則看能不能自成一對新的遞增
                long long current_inc =
                    s1[i - 1] != LLONG_MIN ? s1[i - 1] + nums[i] : LLONG_MIN;
                s1[i] = max((long long)nums[i - 1] + nums[i], current_inc);
            }

            // S2: 遞增後開始遞減
            if (nums[i] < nums[i - 1]) {
                long long prev_state = max(s1[i - 1], s2[i - 1]);
                if (prev_state != LLONG_MIN) {
                    s2[i] = prev_state + nums[i];
                }
            }

            // S3: 遞減後再次遞增 (達成 Trionic)
            if (nums[i] > nums[i - 1]) {
                long long prev_state = max(s2[i - 1], s3[i - 1]);
                if (prev_state != LLONG_MIN) {
                    s3[i] = prev_state + nums[i];
                }
            }

            // 更新最終答案
            if (s3[i] != LLONG_MIN) {
                maxSum = max(maxSum, s3[i]);
            }
        }

        return (maxSum == LLONG_MIN) ? -1 : maxSum;
    }
};
```
