# MealMate

## Overview
MealMate is an Android application designed to help users manage their meal planning, recipes, and dietary preferences. The app aims to simplify meal preparation and promote healthy eating habits through smart meal recommendations and easy-to-follow recipes.

## Project Purpose
- Streamline meal planning and preparation process
- Help users maintain healthy eating habits through smart recommendations
- Provide an intuitive platform for recipe management and meal scheduling
- Support dietary restrictions and preferences
- Promote sustainable and healthy eating habits

## Technical Stack
- Android (Kotlin)
- MVVM Architecture
- Jetpack Components
- Room Database
- Retrofit for API communication
- Kotlin Coroutines for asynchronous operations
- Hilt for dependency injection
- JUnit and Espresso for testing

## Setup Instructions

### Prerequisites
- Android Studio Arctic Fox or later
- JDK 11 or later
- Android SDK API 33 (minimum API level 24)
- Gradle 7.4.2 or later

### Development Setup
1. Clone the repository:
   ```bash
   gh repo clone AI4Wings/MealMate
   ```

2. Open the project in Android Studio:
   - Launch Android Studio
   - Select "Open an Existing Project"
   - Navigate to the cloned MealMate directory
   - Click "OK" to open the project

3. Sync the project with Gradle files:
   - Wait for the initial sync to complete
   - If prompted, install any missing Android SDK packages

4. Build the project:
   ```bash
   ./gradlew build
   ```

### Running Tests
The project follows TDD practices. Run tests using:
```bash
./gradlew test         # Unit tests
./gradlew connectedAndroidTest  # Instrumentation tests
```

## Contributing
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Write/update tests for your changes
4. Ensure all tests pass
5. Create a pull request

## Code Style
- Follow Android's official Kotlin style guide
- Maintain clean architecture principles
- Include unit tests for new features
- Use meaningful commit messages

## License
[License details to be added]

## Contact
[Contact information to be added]
