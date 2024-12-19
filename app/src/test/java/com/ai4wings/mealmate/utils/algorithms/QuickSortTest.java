package com.ai4wings.mealmate.utils.algorithms;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.Arrays;
import java.util.List;
import java.util.Comparator;

@RunWith(JUnit4.class)
public class QuickSortTest {

    @Test
    public void testBasicNumberSorting() {
        // Test data
        List<Integer> input = Arrays.asList(64, 34, 25, 12, 22, 11, 90, 34);
        List<Integer> expected = Arrays.asList(11, 12, 22, 25, 34, 34, 64, 90);

        // Execute sort
        List<Integer> result = QuickSort.sort(input);

        // Verify result
        assertEquals(expected, result);
    }

    @Test
    public void testComplexSortingWithComparator() {
        // Test data - list of StudentScore objects
        List<StudentScore> input = Arrays.asList(
            new StudentScore("Alice", 85),
            new StudentScore("Bob", 92),
            new StudentScore("Charlie", 78),
            new StudentScore("David", 95),
            new StudentScore("Eve", 88)
        );

        List<StudentScore> expected = Arrays.asList(
            new StudentScore("Charlie", 78),
            new StudentScore("Alice", 85),
            new StudentScore("Eve", 88),
            new StudentScore("Bob", 92),
            new StudentScore("David", 95)
        );

        // Execute sort with custom comparator
        List<StudentScore> result = QuickSort.sort(input,
            Comparator.comparingInt(StudentScore::getScore));

        // Verify result
        assertEquals(expected, result);
    }

    private static class StudentScore {
        private final String name;
        private final int score;

        StudentScore(String name, int score) {
            this.name = name;
            this.score = score;
        }

        public int getScore() {
            return score;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            StudentScore that = (StudentScore) obj;
            return score == that.score && name.equals(that.name);
        }

        @Override
        public int hashCode() {
            return 31 * name.hashCode() + score;
        }
    }
}
