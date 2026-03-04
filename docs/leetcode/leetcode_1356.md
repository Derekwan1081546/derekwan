
# Leetcode-1356. Sort Integers by The Number of 1 Bits
## 題目說明
給定一個整數數組 `arr`。請以二進位表示法中 `1` 的個數升序排列數組中的整數。如果兩個或多個整數中 `1` 的個數相同，則需要將它們也升序排列。

傳回排序後的陣列。

### 限制條件：
- `1 <= arr.length <= 500`。
- `0 <= arr[i] <= 10＾4`。

## 解題思路

這道題目的目標是將陣列中的數字按照二進位中 `1` 的個數進行升序排列。如果 `1` 的個數相同，則按數字本身的大小進行升序排列。

### 1. 核心邏輯：雙重排序規則
我們需要定義一個比較規則（Comparator），讓排序演算法知道如何決定兩個數字 $a$ 和 $b$ 的先後順序：
- **優先準則**：計算 $a$ 與 $b$ 的二進位 `1` 個數。個數較少的排在前面。
- **次要準則**：若 `1` 的個數相同，則比較數字本身的大小，較小的排在前面。

### 2. 演算法步驟
1.  **實作計數函式 (`countBits`)**：
    * 利用「除 2 取餘數」的原理，遍歷數字的每一個二進位位元。
    * 若 `n % 2 == 1`，計數器加一。
    * 執行 `n = n / 2` 移除已檢查的位元。
2.  **調用排序函式 (`std::sort`)**：
    * 使用 C++ 的 `std::sort` 並傳入一個 **Lambda 表達式** 作為自訂比較規則。
    * 在 Lambda 內分別計算兩個數字的位元重量。
3.  **執行排序並回傳**：
    * `std::sort` 會根據我們提供的規則直接在原陣列 `arr` 上進行原地排序（In-place sort）。

---

### 3. 效能分析
| 維度 | 複雜度 | 說明 |
| :--- | :--- | :--- |
| **時間複雜度** | $O(N \log N \cdot \log M)$ | $N$ 為陣列長度，$M$ 為數字的最大值。排序需 $O(N \log N)$ 次比較，每次比較需 $O(\log M)$ 時間計算位元。 |
| **空間複雜度** | $O(\log N)$ 或 $O(1)$ | 取決於 `std::sort` 的實作方式（通常為快速排序或堆積排序的變體）。 |

---

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    // 計算 1 數量的輔助函式
    static int countBits(int n) {
        int count = 0;
        while (n > 0) {
            // 如果除以 2 餘數是 1，代表二進位的最後一個位元是 1
            if (n % 2 == 1) {
                count++;
            }
            // 接著把數字除以 2（相當於二進位向右移一位）
            n = n / 2; 
        }
        return count;
    }
    vector<int> sortByBits(vector<int>& arr) {
        // 直接使用 sort 搭配自訂規則，不需要先做一次普通的 sort
        sort(arr.begin(), arr.end(), [](int a, int b) {
            // 呼叫我們自己寫的函式來計算 a 和 b 中 1 的數量
            int countA = countBits(a);
            int countB = countBits(b);
            
            // 規則 1：如果 1 的數量一樣，數字小的排前面
            if (countA == countB) {
                return a < b;
            }
            // 規則 2：1 的數量不一樣時，數量少的排前面
            return countA < countB;
        });
        
        // sort 是直接在原陣列上排序，所以直接回傳 arr 即可
        return arr;
    }
};
```