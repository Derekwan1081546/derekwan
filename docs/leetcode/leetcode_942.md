
# Leetcode-942. DI String Match
## 題目說明
`[0, n]` 範圍內所有整數的 `n + 1` 個整數的排列 `perm` 可以表示為長度為 `n` 的字串 `s`，其中：

如果 `perm[i] < perm[i + 1]`，則 `s[i] == 'I'` 。
如果 `perm[i] > perm[i + 1]`，則 `s[i] == 'D'` 。
給定一個字串 `s`，重建排列 `perm` 並傳回它。如果有多個有效的排列 `perm`，則傳回其中任何一個。
### 限制條件：
- `1 <= s.length <= 10^5`
- `s[i] 為'I'或'D'`。
## 解題思路
- `n` 是字串 `s` 的長度，表示要產生的排列有 `n+1` 個數字 `（從 0 到 n）`。
- `low` 和 `high` 是兩個指標，`low` 用來填入目前可用的最小值，`high` 用來填入目前可用的最大值。
- 迴圈遍歷字串 `s`，根據 `s[i]` 是 `'I'` 還是 `'D'`，來決定填入 `perm[i]` 的值。如果是 `'I'`，從 `low` 開始填入，並遞增 `low`；如果是 `'D'`，則從 `high` 填入，並遞減 `high`。
當迴圈結束時，`low` 和 `high` 應該相等，因為所有的數字除了最後一個都已經填入，因此最後的數字可以是 `low` 或 `high`，它們都會是同一個數字。
最後，返回生成的排列 `perm`。
## 參考解法
```cpp title="C++" showLineNumbers {4}
class Solution {
public:
    vector<int> diStringMatch(string s) {
        int n = s.size();
        int low = 0, high = n;
        vector<int> perm(n + 1); // perm 大小應該是 n + 1個數字
        for (int i = 0; i < n; i++) {
            if (s[i] == 'I') {
                perm[i] = low++;
            } else {
                perm[i] = high--;
            }
        }
        // 填入最後剩餘的一個數字
        perm[n] = low; // 這時 low 和 high 相等，可以任意填入
        return perm;
    }
};
```