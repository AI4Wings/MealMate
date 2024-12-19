package com.ai4wings.mealmate.utils.algorithms;

import androidx.annotation.NonNull;
import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.util.Comparator;

public class QuickSort {
    private static final Random random = new Random();

    private QuickSort() {
    }

    @NonNull
    public static &lt;T extends Comparable&lt;T&gt;&gt; List&lt;T&gt; sort(@NonNull List&lt;T&gt; list) {
        return sort(list, T::compareTo);
    }

    @NonNull
    public static &lt;T&gt; List&lt;T&gt; sort(@NonNull List&lt;T&gt; list, @NonNull Comparator&lt;T&gt; comparator) {
        if (list.size() &lt;= 1) {
            return new ArrayList&lt;&gt;(list);
        }

        int pivotIndex = random.nextInt(list.size());
        T pivot = list.get(pivotIndex);

        List&lt;T&gt; less = new ArrayList&lt;&gt;();
        List&lt;T&gt; equal = new ArrayList&lt;&gt;();
        List&lt;T&gt; greater = new ArrayList&lt;&gt;();

        for (int i = 0; i &lt; list.size(); i++) {
            T element = list.get(i);
            int comparison = comparator.compare(element, pivot);

            if (comparison &lt; 0) {
                less.add(element);
            } else if (comparison &gt; 0) {
                greater.add(element);
            } else {
                equal.add(element);
            }
        }

        List&lt;T&gt; result = new ArrayList&lt;&gt;(list.size());
        result.addAll(sort(less, comparator));
        result.addAll(equal);
        result.addAll(sort(greater, comparator));

        return result;
    }
}
