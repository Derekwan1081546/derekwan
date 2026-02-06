
# Leetcode-19. Remove Nth Node From End of List
## 題目說明
給定一 `linked list` 的頭節點 `head`，從 `linked list` 末端移除第 `n` 個節點並返回其頭節點。

### 限制條件：
- 列表中的節點數為 `sz`。
- `1 <= sz <= 30`。
- `0 <= Node.val <= 100`。
- `1 <= n <= sz`。
## 解題思路
本題的目標是從單向鏈結串列中，刪除倒數第 `n` 個節點，並回傳刪除後的新串列頭。由於單向鏈結串列無法直接從尾端往前數，因此需要先知道串列的長度，才能確定實際要刪除的是哪一個節點。

為了避免刪除頭節點時需要額外處理的情況，先建立一個 `dummy` 節點，並讓它指向原本的 `head`。這樣一來，不論刪除的是哪一個節點，都可以視為刪除某個節點的 `next`，邏輯會更加一致。

接著從 `head` 開始走訪整條鏈結串列，計算出串列的總長度。當已知總長度後，倒數第 `n` 個節點等同於從開頭數來的第 `length − n` 個節點。由於我們需要重新串接前一個節點，因此從 dummy 節點開始往後移動 `length − n` 步，即可停在目標節點的前一個位置。

當指標停在正確的位置後，只要將目前節點的 `next` 指向 `next` 的 `next`，即可跳過並刪除倒數第 `n` 個節點。最後回傳 `dummy` 的 `next` 作為新的 `head`，確保即使原本的頭節點被刪除也能正確回傳。

此方法需要走訪鏈結串列兩次，一次用於計算長度，一次用於找到要刪除的位置，因此時間複雜度為 `O(n)`。空間複雜度方面，除了額外使用一個 `dummy` 節點與少量指標變數外，不需要額外資料結構，為 `O(1)`。
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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // 1. 建立一個 Dummy node 指向 head
        // 這樣可以避免刪除 head 時需要特殊處理
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        // 2. 計算鏈結串列的實際長度
        int length = 0;
        ListNode* temp = head;
        while (temp != nullptr) {
            length++;
            temp = temp->next;
        }

        // 3. 找到要刪除節點的「前一個節點」
        // 我們從 dummy 開始走，因為如果刪除的是 head，dummy 就是它的前一個
        ListNode* current = dummy;
        // 我們需要走 (length - n) 步，就能停在目標節點的前方
        for (int i = 0; i < length - n; i++) {
            current = current->next;
        }

        // 此時 current 停在被刪除節點的前方
        // 例如: dummy -> 1 -> 2 -> 3, 刪除 2
        // current 會停在 1
        // 4. 重新串接：跳過要刪除的節點
        current->next = current->next->next;

        // 5. 回傳 dummy->next (因為 head 可能被刪除了，所以不能直接回傳 head)
        ListNode* newHead = dummy->next;
        delete dummy; // 刪除暫用的 dummy node
        return newHead;
    }
};
```