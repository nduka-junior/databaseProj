CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"matric_number" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"gender" varchar(10) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"address" text NOT NULL,
	"dob" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
