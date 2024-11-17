
# Leetcode-1930. Unique Length-3 Palindromic Subsequences
## 題目說明
給定一個字串 `s`，傳回作為 `s` 子序列的長度為 `3` 的唯一回文數。

請注意，即使有多種方式獲得相同的子序列，它仍然只計算一次。

回文是向前和向後讀取相同的字串。

字串的子序列是在原始字串中刪除一些字元（可以沒有）而產生的新字串，而不改變其餘字元的相對順序。

例如，`ace`是`abcde`的子序列。


- 範例1：

    輸入：s =“aabca”
    輸出：3
    解釋：長度為 3 的 3 個回文子序列是：
    - 「aba」（「aabca」的子序列）
    - “aaa”（“aabca”的子序列）
    - “aca”（“aabca”的子序列）

- 範例2：

    輸入：s =“adc”
    輸出：0
    解釋：「adc」中不存在長度為 3 的回文子序列。

- 範例3：

    輸入：s =“bbcbaba”
    輸出：4
    解釋：長度為 3 的 4 個回文子序列是：
    - 「bbb」（「bbcbaba」的子序列）
    - 「bcb」（「bbcbaba」的子序列）
    - 「bab」（「bbcbaba」的子序列）
    - 「aba」（「bbcbaba」的子序列）

### 限制條件：
- `3 <= s.length <= 105`
- `s `僅由小寫英文字母組成。

## 解題思路
這題要求計算字串 `s` 中所有長度為 3 的不同迴文子序列的數量。解題思路如下：

1. **找出字串中所有不同的字符**，並將它們儲存在 `letters` 集合中。
2. **遍歷每個不同的字符**，對於每個字符：
   - 找出該字符在字串中**第一次出現的位置 `i`** 和**最後一次出現的位置 `j`**。
3. **檢查位置 `i` 和 `j` 之間的所有字符**，記錄其中不同的字符數量。
4. 每個在 `i` 和 `j` 之間的不同字符，都可以與 `i` 和 `j` 的相同字符組成長度為 3 的迴文子序列。因此，將這些不同字符的數量累加到 `count`。
5. 最後返回 `count`，即符合條件的迴文子序列的總數。 

例如，對於字串 `"abca"`，字符 `'a'` 的第一次和最後一次出現之間有字符 `'b'` 和 `'c'`，可以組成兩個長度為 3 的迴文子序列 `"aba"` 和 `"aca"`。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int n = s.size();
        int count = 0;  // 計算迴文子序列的數量
        unordered_set<char> letters;
        // Step 1: 找出字串中所有不同的字符，並儲存在 `letters` 中
        for (char c : s) {
            letters.insert(c);
        }
        for (auto letter : letters) {
            int i = -1;
            int j = 0;
            // Step 2: 找出字符 `letter` 的第一次出現位置 `i` 和最後一次出現位置 `j`
            for (int k = 0; k < n; k++) { // 檢查是否為迴文
                if (s[k] == letter) {
                    if (i == -1) {
                        i = k; // 記錄第一次出現的位置
                    }
                    j = k; // 記錄最後一次出現的位置
                }
            }
            unordered_set<char> between; // 找出在 i 和 j 之間的所有唯一字符
            for (int k = i + 1; k < j; k++) {
                between.insert(s[k]);
            }
            count += between.size(); // 將在 i 和 j 之間的唯一字符數量加入到 count 中
        }

        return count;
    }
};
```