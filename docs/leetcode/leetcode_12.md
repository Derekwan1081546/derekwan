
# Leetcode-13. Roman to Integer
## 題目說明
羅馬數字以七個不同的符號表示：`I`、`V`、`X`、`L`、`C`、`D` 和 `M`。
| Symbol |  Value |
|--------|--------|
| I      |   1    |
| V      |   5    |
| X      |   10   |
| L      |   50   | 
| C      |   100  |
| D      |   500  |
| M      |   1000 |

例如，2用羅馬數字寫成II，只是兩個數字相加。 12寫成XII，簡單來說就是X+II。 數字27寫成XXVII，即XX+V+II。

羅馬數字通常從左到右從最大到最小書寫。 然而，四的數字不是 IIII。 相反，數字四寫作 IV。 因為一在五之前，所以我們減去它，得到四。 同樣的原則也適用於數字九，寫成IX。 有六種使用減法的情況：

`I` 可以放在 `V` (5) 和 `X` (10) 之前，得到 4 和 9。
`X` 可以放在 `L` (50) 和 `C` (100) 之前，以獲得 40 和 90。
`C` 可以放在 `D`（500）和 `M`（1000）之前，以獲得400和900。
給定一個整數，將其轉換為羅馬數字。

### 限制條件：
- `1 <= num <= 3999`
## 解題思路
使用了四個字串數組 ones、tens、hrns 和 ths 來表示個位、十位、百位和千位上的羅馬數字。每個數組中的元素依次對應到 0 到 9 的整數。

在函數中，首先根據整數 num 的千位數來從 ths 數組中取得對應的羅馬數字，然後根據整數 num 的百位、十位和個位來從 hrns、tens 和 ones 數組中取得對應的羅馬數字。

最後，將這四個部分拼接在一起，即可得到整數 num 對應的羅馬數字表示。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    string intToRoman(int num) {
        string ones[] = {"",  "I",  "II",  "III",  "IV",
                         "V", "VI", "VII", "VIII", "IX"};
        string tens[] = {"",  "X",  "XX",  "XXX",  "XL",
                         "L", "LX", "LXX", "LXXX", "XC"};
        string hrns[] = {"",  "C",  "CC",  "CCC",  "CD",
                         "D", "DC", "DCC", "DCCC", "CM"};
        string ths[] = {"", "M", "MM", "MMM"};

        return ths[num / 1000] + hrns[(num % 1000) / 100] +
               tens[(num % 100) / 10] + ones[num % 10];
    }
};
```