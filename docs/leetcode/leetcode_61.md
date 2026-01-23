
# Leetcode-61. Rotate List
## 題目說明
給定一 `linked list` 的 `head`，將 `linked list`向右旋轉 `k` 位元。
### 限制條件：
-  `1 <= n <= 9`
-  `1 <= k <= n！`
## 解題思路
目標是將一個單向鏈結串列向右旋轉 `k` 次，也就是每旋轉一次，就把串列最後一個節點移到最前面。

解題的第一個重點，是先處理邊界情況。如果串列本身是空的，或之後計算發現實際不需要旋轉，直接回傳原本的串列即可。

接著先遍歷整條鏈結串列一次，目的有兩個：一是計算串列的總長度，二是拿到尾節點。尾節點在之後重新接回串列時會用到。因為串列是單向的，若不知道長度與尾端位置，後續操作會變得複雜。

由於旋轉次數 `k` 可能遠大於串列長度，實際有效的旋轉次數只需要取 `k` 對長度取餘數即可。如果 `k` 是長度的倍數，代表旋轉後的結果與原串列完全一樣，可以直接回傳。

在確定需要旋轉後，下一步是找出新的斷開位置。向右旋轉 `k` 次，等價於在串列中「從尾巴往前數 `k` 個節點」作為新的頭節點。換個角度看，就是從頭開始走到第 `length − k − 1` 個節點，這個節點會成為新的尾節點。

當這個位置找到後，將它的下一個節點設為新的頭節點，並把目前的 `next` 設為 `null`，完成斷開。此時串列被分成前後兩段。

最後一步是把原本的尾節點接回原本的頭節點，讓後半段串列接到前半段的前面，完成整個向右旋轉的操作，並回傳新的頭節點。

時間複雜度方面，整個過程只需要對鏈結串列做常數次的線性走訪，因此時間複雜度是 `O(n)`，其中 `n` 是串列的長度。

空間複雜度方面，沒有使用任何額外與串列長度成正比的資料結構，只用了幾個指標變數，因此空間複雜度是 `O(1)`。
## 參考解法
```cpp title="C++" showLineNumbers
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (head == nullptr)
            return head;

        int length = 1;
        ListNode* dummy = head;
        while (dummy->next) {
            dummy = dummy->next;
            length++;
        }
        int position = k % length;
        if (position == 0)
            return head;
        ListNode* current = head;
        for (int i = 0; i < length - position - 1; i++) {
            current = current->next;
        }
        ListNode* newhead = current->next;
        current->next = nullptr;
        dummy->next = head;
        return newhead;
    }
};
```