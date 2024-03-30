
# Leetcode-28. Find the Index of the First Occurrence in a String
## 題目說明
給定兩個字串 `needle`和 `haystack`，傳回 `needle` 在 `haystack` 中第一次出現的索引，如果 `needle` 不是 `haystack` 的一部分，則傳回-1。

### 限制條件：
- `1 <= haystack.length，needle.length <= 10^4`
- `haystack` 和 `needle` 僅由小寫英文字元組成。
## 解題思路
首先使用`j`用來記錄`needle`當前`index`，比跟`haystack`第`i+j`個元素做比對，如果相同則將`j`往前一格繼續比對直到等於`needle`的長度為止，最後判斷如果`j`等於`needle`得長度就回傳`i`，否則回傳`-1`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int strStr(string haystack, string needle) {
        for (int i = 0; i < haystack.size(); i++) {
            int j = 0; // 用於匹配needle的索引
            while (j < needle.size() && haystack[i + j] == needle[j]) {
                j++;
            }
            if (j == needle.size()) {
                return i; // needle完全匹配，則返回起始索引
            }
        }

        return -1; // 未找到匹配的子串，返回-1
    }
};
```