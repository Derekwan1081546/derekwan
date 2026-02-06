
# Leetcode-3010. Divide an Array Into Subarrays With Minimum Cost I
## 題目說明
給定一個長度為 `n` 的整數數組 `nums`。

數組的成本值等於其第一個元素的值。例如，陣列 `[1,2,3]` 的成本值為 `1`，而陣列 `[3,4,1]` 的成本值為 `3`。

你需要將 `nums` 分割成 `3` 個互不相交的連續子數組。

傳回這 `3` 個子數組成本值的最小和。

### 限制條件：
- `3 <= n <= 50`。

- `1 <= nums[i] <= 50`。


## 解題思路

這段程式碼的目標是解決 **LeetCode 3010. Divide an Array Into Subarrays With Minimum Cost I**（將陣列分成三個子陣列的最小代價）。
題目的核心要求是將陣列切成三個連續子陣列，代價是這三個子陣列 **第一個元素** 的總和。為了讓總和最小，我們採取 **貪婪策略 (Greedy Strategy)**：

1.  **固定首項**：
    第一個子陣列必須從索引 `0` 開始，因此 `nums[0]` 一定會被選入計算，無法改變。

2.  **挑選剩餘最小的兩項**：
    我們需要決定第二個和第三個子陣列的起始位置。為了讓總和最小，我們只需要從剩下的元素（即 `nums[1]` 到最後）中，找出 **數值最小的兩個數**。

3.  **排序與加總**：
    * `sort(nums.begin() + 1, nums.end())`：保留 `nums[0]` 不動，將後面所有的元素由小到大排序。
    * 排序後，`nums[1]` 和 `nums[2]` 就會是剩餘部分中最小的兩個數。
    * `reduce(nums.begin(), nums.begin() + 3, 0)`：計算 `nums[0] + nums[1] + nums[2]`，即為最小代價。

---

### 複雜度分析

* **時間複雜度：$O(N \log N)$**
    其中 $N$ 是陣列的長度。主要的時間開銷來自於 `sort` 函數，其對 $N-1$ 個元素進行排序。
    *(註：其實這題只需要找出最小的兩個數，可以使用線性掃描 $O(N)$ 優化，但此程式碼選擇了寫法較簡潔的排序法。)*

* **空間複雜度：$O(1)$** (或是 $O(\log N)$ 取決於排序實作)
    我們直接在原陣列 `nums` 上進行原地排序 (In-place sort)，沒有使用額外的陣列空間。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int minimumCost(vector<int>& nums) {
        sort(nums.begin() + 1, nums.end());
        return reduce(nums.begin(), nums.begin() + 3, 0);
    }
};
```