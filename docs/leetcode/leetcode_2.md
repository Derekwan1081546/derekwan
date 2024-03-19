---
sidebar_position: 2
---
# Leetcode-2
## 題目說明
給定兩個表示兩個非負整數的非空`linked lists`。 這些數字以相反的順序儲存，並且每個節點都包含一個數字。 將兩個數字相加並以`linked lists`形式傳回總和。
您可以假設這兩個數字不包含任何前導零，除了數字 0 本身。

###  限制條件：
- 每個`linked lists`中的節點值皆在 [1, 100] 範圍內。
- `0 <= Node.val <= 9`
## 解題思路
首先宣告一個 `linked lists` "head"來存放資料，同樣再宣告一個node指向當前的節點， 由於式反向儲存數字，因此第一個節點則為個位數，將兩個list的值相加後判斷是否需要進位，如果要進位，則加到下一位數以此類推直到兩個list接加完為止。
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* head = new ListNode();
        ListNode* result = head;
        int carry = 0;
        while (l1 != nullptr || l2 != nullptr || carry) {
            int digit1 = (l1 != nullptr) ? l1->val : 0;
            int digit2 = (l2 != nullptr) ? l2->val : 0;
            int sum = digit1 + digit2 + carry;
            ListNode* newNode = new ListNode(sum % 10);
            result->next = newNode;
            result = result->next;
            carry = sum / 10;
            l1 = (l1 != nullptr) ? l1->next : nullptr;
            l2 = (l2 != nullptr) ? l2->next : nullptr;
        }
        ListNode* Node = head->next;
        delete head;
        return Node;
    }
};
```