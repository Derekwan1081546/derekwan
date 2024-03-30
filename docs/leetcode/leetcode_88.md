
# Leetcode-88. Merge Sorted Array
## 題目說明
給定兩個整數數組 `nums1` 和 `nums2`，按非遞減順序排序，以及兩個整數 `m` 和 `n`，分別表示 `nums1` 和 `nums2` 中的元素數量。

將 `nums1` 和 `nums2` 合併到一個以非降序排序的陣列中。

最終排序的陣列不應由函數傳回，而應儲存在陣列 `nums1` 中。 為了適應這一點，`nums1` 的長度為 `m + n`，其中前 `m`個元素表示應合併的元素，最後 `n` 個元素設為 0 並且應被忽略。 `nums2` 的長度為 n。
### 限制條件：
- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-109 <= nums1[i], nums2[j] <= 109`
## 解題思路
將`nums2`中的元素先傳送到`nums1`的陣列上，之後利用`sort()`函式來完成排序。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        for (int i = 0, j = m; i < n; i++, j++) {
            nums1[j] = nums2[i];
        }
        sort(nums1.begin(), nums1.end());
    }
};
```