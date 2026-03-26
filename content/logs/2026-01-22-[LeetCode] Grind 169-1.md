---
title: "[LeetCode Grind 169] Week1 - 1. Two Sum"
date: 2026-01-22
categories: [logs]
---

<a href="https://leetcode.com/problems/two-sum/" target="_blank">문제로</a>

# 풀이
```kotlin
class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val map = mutableMapOf<Int, Int>()

        for(i in 0 until nums.size) {
     // for(i in nums.indices) {
            val cur:Int = nums[i]
            val sub:Int = target - cur

            if(map.containsKey(sub)){
                return intArrayOf(map.get(sub)!!, i)
            } else {
                map.put(cur, i)
            }
        }

        return intArrayOf()
    }
}
```
<br>
<hr>
*HashMap의 get의 시간복잡도가 O(1) 이라길래 코드를 까봤다...*
<hr>
## get은?👇
```kotlin
/**
 * Returns the value to which the specified key is mapped, or {null} if this map contains no mapping for the key.
 * More formally, if this map contains a mapping from a key {k} to a value {v} such that {(key==null ? knull : key.squals(k))}, then this method returns {v}; otherwise it returns {null}. (There can be at most one such mapping.)
 * A return valsue of {null} does not necessarily indicate that the map contains no mapping for the key; it's also possible that the map explicitly maps the key to {null}. the {containsKey} operation may be used to distinguish these two cases.
 */
public V get(Object key) {
    Node<K, V> e;
    return (e = getNode(key)) == null ? null : e.value;
}
```
<details>
<summary>주석 google 번역</summary>
<pre><code class="language-kotlin">
/**
 * 지정된 키가 매핑된 값을 반환하거나, 이 맵에 키에 대한 매핑이 포함되어 있지 않으면 **null**을 반환합니다.
 * 보다 공식적으로, 이 맵에 **(key==null ? knull : key.squals(k))**와 같이 키 **k**에서 값 **v**로의 매핑이 포함되어 있는 경우 이 메서드는 **v**를 반환합니다. 그렇지 않으면 **null**을 반환합니다. (이러한 매핑은 최대 하나만 있을 수 있습니다.)
 * 반환 값 **null**이 반드시 맵에 키에 대한 매핑이 포함되어 있지 않음을 나타내는 것은 아닙니다. 맵이 명시적으로 키를 **null**에 매핑하는 것도 가능합니다. **containsKey** 작업을 사용하여 이 두 가지 경우를 구별할 수 있습니다.
 */
</code></pre>
</details>
<hr>
<br>

## get의 실체, getNode는?👇

```kotlin
/**
 * Implements Map.get and releted methos.
 * 매개변수: {key} - the key
 * 반환: the node, or null if none
 */
final Node<K,V> getNode(Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n, hash; K k;
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & (hash = hash(key))]) != null) {
        if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

## Node는?
```kotlin
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
    ...
}
```
👉 Node는 key-value 하나를 담는 객체

### get() 코드를 살펴보면서 알게된것 정리
* HashMap은 배열을 가지고 있고 배열의 각 요소는 Node 체인의 시작점이다
* HashMap 버킷 하나에는 Node들이 연결 리스트 형태로 연결되어있다 (버킷 = 배열 칸 하나)
<br>
<br>
<br>
<hr>
*getNode()가 O(1)인 사유를 차근차근 살펴보자...*
<hr>
## getNode 분석하기

### 1. 
```kotlin
if ((tab = table) != null && 
        (n = tab.length) > 0 &&
        (first = tab[(n - 1) & (hash = hash(key))]) != null) {
}            
```
- (tab = table) != null <br>
    👉 버킷 배열이 존재하는지 확인
- (n = tab.length) > 0 <br>
    👉 버킷 배열의 길이가 0 이상인지 확인
- (first = tab[(n - 1) & (hash = hash(key))]) != null) <br>
    👉 key의 hash 값을 기반으로 *(n - 1) & hash* 연산을 통해 버킷 인덱스를 O(1)로 결정하고,
해당 버킷의 Node 체인(또는 트리)만 탐색한다.

<details>
    <summary>
        (번외) hash()는??
    </summary>
<pre><code class="language-kotlin">
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
</code></pre>
</details>
<details>
    <summary>(번외) hashCode()는?? </summary>

<pre><code class="language-kotlin">
package java.lang;

/**
 * Returns a hash code value for the object. This method is supported for the benefit of hash tables such as those provided by {java.util.HashMap}.
 * The general contract of {hashCode} is:
 * 
 * - Whenever it is invoked on the same object more than once during an execution of a Java application, the {hashCode} method must consistently return the same integer, provided no information used in {equals} comparisons on the object is modified. This integer need not remain consistent from one execution of an application to another execution of the same application.
 * - If two objects are equal according to the {(Object) equals} method, then calling the {hashCode} method on each of the two objects must produce the same integer result.
 * - It is not required that if two objects are unequal according to the {(Object) equals} method, then calling the {@code hashCode} method on each of the two objects must produce distinct integer results.  However, the programmer should be aware that producing distinct integer results for unequal objects may improve the performance of hash tables.
 *
 * As far as is reasonably practical, the {hashCode} method defined
 * by class {Object} returns distinct integers for distinct objects.
 *
 * @return  a hash code value for this object.
 * @see     java.lang.Object#equals(java.lang.Object)
 * @see     java.lang.System#identityHashCode
 */
public native int hashCode();
</code></pre>
</details>
<hr>
<details>
    <summary>주석 google 번역</summary>
<pre><code class="language-kotlin">
/**
 * 객체에 대한 해시 코드 값을 반환합니다.
 * 이 메서드는 {@link java.util.HashMap}과 같은 해시 테이블 자료구조를
 * 지원하기 위해 제공됩니다.
 *
 * {@code hashCode}의 일반적인 계약(규약)은 다음과 같습니다.
 *
 * - 자바 애플리케이션 실행 중 동일한 객체에 대해 여러 번 호출되더라도,
 *   {@code equals} 비교에 사용되는 객체의 정보가 변경되지 않는 한
 *   {@code hashCode} 메서드는 항상 동일한 정수 값을 반환해야 합니다.
 *   이 값은 애플리케이션 실행이 달라지면 동일할 필요는 없습니다.
 *
 * - {@code equals(Object)} 메서드에 따라 두 객체가 같다면,
 *   두 객체에 대해 {@code hashCode}를 호출한 결과는 반드시 동일해야 합니다.
 *
 * - {@code equals(Object)} 메서드에 따라 두 객체가 같지 않더라도,
 *   {@code hashCode}가 서로 다른 값을 반환할 필요는 없습니다.
 *   다만, 서로 다른 객체에 대해 서로 다른 해시 코드를 반환할수록
 *   해시 테이블의 성능은 향상될 수 있습니다.
 *
 * 합리적으로 가능한 범위 내에서,
 * {@link Object} 클래스에 정의된 {@code hashCode} 메서드는
 * 서로 다른 객체에 대해 서로 다른 정수 값을 반환합니다.
 *
 * @return 이 객체에 대한 해시 코드 값
 * @see java.lang.Object#equals(java.lang.Object)
 * @see java.lang.System#identityHashCode
 */
</code></pre>
</details>
<hr>

#### ⭐이 if 한 줄이 보장하는 것
1. tab(버킷 배열)이 존재한다<br>
2. n(버킷 배열 길이)이 0보다 크다<br>
3. hash가 계산됐고<br>
4. index = (n - 1) & hash 위치의 버킷이 비어있지 않아서<br>
5. 그 버킷의 첫 노드가 first에 담겼다<br>
<br>

### 2.

```kotlin
if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
    return first;
```
- first.hash == hash <br>
    👉 해시값이 같은지 먼저 비교
- (k = first.key) == key <br>
    👉 참조 동일성(reference equality) 비교, 두 객체가 같은 객체면 true
- (key != null && key.equals(k)) <br>
    👉 (k == key)가 false일 때, 값은 같지만 객체는 다른 경우

#### ⭐이 if 한 줄이 보장하는 것
이 버킷의 첫 Node가 <br>
1. 같은 hash 값을 가지고 있고,<br>
2. 같은 객체이거나, 값이 같은 key라면<br>
👉 이 Node를 반환한다<br>


### 3.

```kotlin
if ((e = first.next) != null) {
    if (first instanceof TreeNode)
        return ((TreeNode<K,V>)first).getTreeNode(hash, key);
    do {
        if (e.hash == hash &&
            ((k = e.key) == key || (key != null && key.equals(k))))
            return e;
    } while ((e = e.next) != null);
}
```
- if ((e = first.next) != null) <br>
    👉 이 버킷에 노드가 2개 이상 있을 때,
- if (first instanceof TreeNode) return ((TreeNode<K,V>)first).getTreeNode(hash, key);

    <details>
        <summary>
            👉요약: “이 버킷이 트리로 바뀐 상태면 트리 검색으로 처리”
        </summary> 
        
        - 이 버킷은 원래 “연결 리스트 체인”인데,<br>
        - 충돌이 너무 많아지면 JDK8+에서 트리(레드-블랙 트리) 로 바꿉니다.<br>
        - 그 상태면 first가 TreeNode 타입입니다.<br>
        그래서:<br>
        - 리스트처럼 next로 순회하지 않고<br>
        - 트리 검색 로직(getTreeNode)으로 넘어갑니다. (버킷 내부 검색이 O(log k)로 개선)<br>
    </details>
- do { ... } while ((e = e.next) != null);<br>
    👉 e.hash == hash 먼저 빠르게 필터<br>
    👉 그 다음, (k = e.key) == key (참조 동일성) 또는 key.equals(k) (값 동등성)을 비교하여 참일 경우 해당 노드 e를 반환<br>

    <details><summary>왜 do-while인가?</summary>
    👉 이미 e = first.next가 null이 아님을 확인하고 들어왔기에 최소 1번은 검사해야 함
    </details>
    <details><summary>반복조건 while ((e = e.next) != null)</summary>
    - 다음 노드로 이동하면서 null이면 종료
    👉2번째 노드부터 끝까지 동일한 비교 로직으로 순차 탐색
    </details>

#### ⭐이 블록의 역할
첫 노드에서 못 찾았고 버킷에 추가 노드가 있으면,

if(버킷이 트리면) 트리 검색<br>
else( 아니면 연결 리스트를 끝까지 순회하며) 탐색<br>


<hr>
*결론, getNode()는 key의 해시로 해당 버킷의 Node 체인(또는 트리)만 탐색한다. 따라서 평균적으로는 조회가 O(1)에 가깝다...*
<hr>