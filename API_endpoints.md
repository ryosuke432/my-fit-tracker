Sole Entity Endpoints:
1.	Member Endpoints:
-	GET /member
    Description: Retrieves all members.
-	GET /member/{id}
    Description: Retrieves a member by ID.
-	PUT /member/{id}
    Description: Updates an existing member.
-	DELETE /member/{id}
    Description: Deletes a member by ID.
2.	Authentication Endpoints:
-	POST /signup
    Description: Register a new member/instructor.
-	POST /login
    Description: Verify login information and authenticate it.
3.	Instructor Endpoints (Optional):
-	GET /instructor
    Description: Retrieves all instructors.
-	GET /instructor/{id}
    Description: Retrieves an instructor by ID.
-	PUT /instructor/{id}
    Description: Updates an existing instructor.
-	DELETE /instructor/{id}
    Description: Deletes an instructor by ID.
4.	Lesson Endpoints (Optional):
-	GET /lesson
    Description: Retrieves all lessons.
-	GET /lesson/{id}
    Description: Retrieves a lesson by ID.

Entities Interacting with other Entities
1.	Member-Workout Interaction:
-	GET /member/{member_id}/workout
    Description: Retrieves all workout data of a specific member.
-	GET /member/{member_id}/workout/{workout_id}
    Description: Retrieves a specific workout data of a specific member.
-	POST /member/{member_id}/workout
    Description: Add a new workout of a specific member.
-	PUT /member/{member_id}/workout/{workout_id}
    Description: Updates a specific workout data of a specific member.
-	DELETE /member/{member_id}/workout/{workout_id}
    Description: Deletes a specific workout data of a specific member.
2.	Member-Nutrition Interaction:
-	GET /member/{member_id}/nutrition
    Description: Retrieves all nutrition data of a specific member.
-	GET /member/{member_id}/nutrition/{nutrition_id}
    Description: Retrieves a specific nutrition of a specific member.
-	POST /member/{member_id}/nutrition
    Description: Add new nutrition data of a specific member.
-	PUT /member/{member_id}/nutrition/{nutrition_id}
    Description: Updates existing nutrition data of a specific member.
-	DELETE /member/{member_id}/nutrition/{nutrition_id}
    Description: Deletes specific nutrition data of a specific member.
3.	Member-Goal Interaction:
-	GET /member/{member_id}/goal
    Description: Retrieves all goals of a specific member.
-	GET /member/{member_id}/goal/{goal_id}
    Description: Retrieves a specific goal of a specific member.
-	POST /member/{member_id}/goal
    Description: Add a new goal of a specific member.
-	PUT /member/{member_id}/goal/{goal_id}
    Description: Updates an existing goal of a specific member.
-	DELETE /member/{member_id}/goal/{goal_id}
    Description: Deletes a specific goal of a specific member.
4.	Member-Route Interaction (Optional):
-	GET /member/{member_id}/route
    Description: Retrieves all routes of a specific member.
-	GET /member/{member_id}/route/{route_id}
    Description: Retrieves a specific route of a specific member.
-	POST /member/{member_id}/route
    Description: Add a new route of a specific member.
-	PUT /member/{member_id}/route/{route_id}
    Description: Updates an existing route of a specific member.
-	DELETE /member/{member_id}/route/{route_id}
    Description: Deletes a specific route of a specific member.
5.	Member-Lesson Interaction (Optional):
-	GET /member/{member_id}/lesson
    Description: Retrieves lessons that a specific member takes.
-	GET /member/{member_id}/lesson/{lesson_id}
    Description: Retrieves a specific lesson that a specific member takes.
-	DELETE /member/{member_id}/lesson/{lesson_id}
    Description: Delete a specific lesson that a specific member takes.
6.	Instructor-Lesson Interaction (Optional):
-	GET /instructor/{instructor_id}/lesson
    Description: Retrieves lessons that a specific instructor provides.
-	GET /instructor/{instructor_id}/lesson/{lesson_id}
    Description: Retrieves a specific lesson that a specific instructor takes.
-	POST /instructor/{instructor_id}/lesson
    Description: Add a new lesson of a specific instructor.
-	PUT /instructor/{instructor_id}/lesson/{lesson_id}
    Description: Updates a specific lesson of a specific instructor.
-	DELETE /instructor/{instructor_id}/lesson/{lesson_id}
    Description: Deletes a specific lesson of a specific instructor.
7.	Member-Payment Method Interaction (Optional): 
-	GET /member/{member_id}/payment
    Description: Retrieves all payment methods of a specific member.
-	GET /member/{member_id}/payment/{payment_id}
    Description: Retrieves a specific payment method of a specific member.
-	POST /member/{member_id}/payment
    Description: Creates a new payment method of a specific member.
-	PUT /member/{member_id}/payment/{payment_id}
    Description: Updates a specific payment method of a specific member.
-	DELETE /member/{member_id}/payment/{payment_id}
    Description: Deletes a specific payment receive method of a specific member.
8.	Instructor-Payment Method Interaction (Optional): 
-	GET /instructor/{instructor_id}/payment
    Description: Retrieves all payment receive methods of a specific instructor.
-	GET /instructor/{instructor_id}/payment/{payment_id}
    Description: Retrieves a specific payment receive method of a specific instructor.
-	POST /instructor/{instructor_id}/payment
    Description: Creates a new payment method of a specific instructor.
-	PUT /instructor/{instructor_id}/payment/{payment_id}
    Description: Updates a specific payment receive method of a specific instructor.
-	DELETE /instructor/{instructor_id}/payment/{payment_id}
    Description: Deletes a specific payment receive method of a specific instructor.
9.	Member-Channel Interaction:
-	GET /member/{member_id}/channel
    Description: Retrieves all channels which a specific member belongs to.
-	GET /channel/{channel_id}/member
    Description: Retrieves all members belonging to a specific channel.
-	GET /member/{member_id}/channel/{channel_id}
    Description: Retrieves a specific channel of a specific member.
-	POST /member/{member_id}/channel
    Description: Add a new channel of a specific member.
-	PUT /member/{member_id}/channel/{channel_id}
    Description: Updates an existing channel of a specific member.
-	DELETE /member/{member_id}/channel/{channel_id}
    Description: Deletes a specific channel of a specific member.
10.	Member-Message Interaction:
-	GET /member/{member_id}/message
    Description: Retrieves all messages which a specific member belongs to.
-	GET /channel/{channel_id}/member
    Description: Retrieves all members belonging to a specific channel.
-	GET /member/{member_id}/channel/{channel_id}
    Description: Retrieves a specific channel of a specific member.
-	POST /member/{member_id}/channel
    Description: Add a new channel of a specific member.
-	PUT /member/{member_id}/channel/{channel_id}
    Description: Updates an existing channel of a specific member.
-	DELETE /member/{member_id}/channel/{channel_id}
    Description: Deletes a specific channel of a specific member.