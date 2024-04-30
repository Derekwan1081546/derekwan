
# Leetcode-274. H-Index
## 題目說明
給定一個整數引用數組，其中 `citations[i]` 是研究人員第 `i` 篇論文收到的引用次數，返回該研究人員的 `H-Index(h 指數)`。

根據維基百科上`H-Index(h 指數)`的定義：`H-Index(h 指數)`被定義為 `h` 的最大值，使得給定的研究人員至少發表了 `h` 篇論文，每篇論文被引用了至少h次。
### 限制條件：
- `n == citations.length`
- `1 <= n <= 5000`
- `0 <= citations[i] <= 1000`

## 解題思路
1. `Brute Force` 暴力法：
依降序對引文數組進行排序，並迭代排序後的陣列。對於每篇論文，檢查其引用計數是否大於或等於其在排序數組中的位置。追蹤遇到的最大 `h` 指數。由於排序步驟，此方法的時間複雜度為 `O(n log n)`。
2. `Binary Search` 二分搜尋法：
對引文數組進行排序並執行二分搜尋以尋找 `h` 索引。初始化 0 到引文數組長度之間的搜尋範圍。在每次迭代中，計算中點並統計引用大於或等於中點的論文數量。根據此計數調整搜尋範圍。由於排序步驟，此方法的時間複雜度為 `O(n log n)`。
## 參考解法
```cpp title="C++ Brute Force" showLineNumbers
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int tag = 0;
        int n = citations.size();
        sort(citations.begin(), citations.end());
        for (int i = 0; i < citations.size(); i++) {
            if (citations[i] >= n - i) {
                tag = max(tag, n - i);
            }
        }
        return tag;
    }
};
```
```cpp title="C++ Binary Search" showLineNumbers
class Solution
{
public:
    int hIndex(vector<int> &citations)
    {
        sort(citations.begin(), citations.end());
        int n = citations.size();
        int start = 0, end = n - 1;
        int ans = 0;
        while (start <= end)
        {
            int mid = (start + end) / 2;//OR start + (end - start) / 2;也可
            if (citations[mid] >= n - mid)
            {
                ans = max(ans, n - mid);
                end = mid - 1;
            }
            else
            {
                start = mid + 1;
            }
        }
        return ans;
    }
};
```