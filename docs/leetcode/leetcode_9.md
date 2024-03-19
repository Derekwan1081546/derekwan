---
sidebar_position: 2
---
# Leetcode-2
## 題目說明
給定一個整數 x，如果 x 是回文(即從左到右或從又到左讀接的一樣)，則傳回 true ，否則為 false。
## 解題思路
首先判斷x是否為負數，因為負數一定不是回文，接下來再從個位數開始讀取到最高位數，最後判斷與原本的值是否一樣後即可回傳。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) {
            return false;
        } else {
            long long num = 0;
            long long value = x;
            while (value > 0) {
                num = num * 10 + value % 10;
                value /= 10;
            }
            return num == x ? true : false;
        }
    }
};
```