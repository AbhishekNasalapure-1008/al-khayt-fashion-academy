/**
 * AL KHAYT Fashion Academy - Form Handler with Firebase & Email
 * Developed by: 1442Abhi
 */

document.addEventListener('DOMContentLoaded', function() {
    
    const registrationForm = document.getElementById('registrationForm');
    const formMessage = document.getElementById('formMessage');

    if (registrationForm) {
        
        // ========================================
        // FORM VALIDATION
        // ========================================
        function validateForm() {
            let isValid = true;
            const formData = new FormData(registrationForm);

            // Validate full name
            const fullname = formData.get('fullname');
            if (!fullname || fullname.trim().length < 2) {
                showMessage('Please enter a valid full name.', 'error');
                isValid = false;
            }

            // Validate email
            const email = formData.get('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                isValid = false;
            }

            // Validate mobile
            const mobile = formData.get('mobile');
            if (!mobile || mobile.trim().length < 10) {
                showMessage('Please enter a valid mobile number.', 'error');
                isValid = false;
            }

            // Validate address
            const address = formData.get('address');
            if (!address || address.trim().length < 5) {
                showMessage('Please enter a valid address.', 'error');
                isValid = false;
            }

            // Validate qualification
            const qualification = formData.get('qualification');
            if (!qualification || qualification === '') {
                showMessage('Please select your qualification.', 'error');
                isValid = false;
            }

            // Check if at least one course is selected
            const courses = formData.getAll('courses[]');
            if (courses.length === 0) {
                showMessage('Please select at least one course.', 'error');
                isValid = false;
            }

            // Check if terms are accepted
            const terms = document.getElementById('terms');
            if (terms && !terms.checked) {
                showMessage('Please accept the Terms and Conditions.', 'error');
                isValid = false;
            }

            return isValid;
        }

        // ========================================
        // FORM SUBMISSION
        // ========================================
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            // Show loading state
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Get form data
            const formData = new FormData(registrationForm);
            
            // Prepare data object for Firebase
            const studentData = {
                fullname: formData.get('fullname'),
                email: formData.get('email'),
                mobile: formData.get('mobile'),
                address: formData.get('address'),
                qualification: formData.get('qualification'),
                courses: formData.getAll('courses[]'),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'pending', // Can be: pending, contacted, enrolled
                createdAt: new Date().toISOString()
            };

            console.log('Submitting student data:', studentData);

            try {
                // Step 1: Save to Firebase Firestore
                console.log('Saving to Firebase...');
                const docRef = await db.collection('registrations').add(studentData);
                console.log('Document written with ID:', docRef.id);

                // Step 2: Send email to student
                console.log('Sending confirmation email to student...');
                const studentEmailResult = await sendStudentEmail(studentData);
                
                if (!studentEmailResult.success) {
                    console.warn('Student email failed, but registration saved:', studentEmailResult.error);
                }

                // Step 3: Send notification email to admin
                console.log('Sending notification email to admin...');
                const adminEmailResult = await sendAdminEmail(studentData);
                
                if (!adminEmailResult.success) {
                    console.warn('Admin email failed, but registration saved:', adminEmailResult.error);
                }

                // Success message
                showMessage(
                    'Registration successful! We have received your application and sent a confirmation email. We will contact you soon.',
                    'success'
                );
                
                // Reset form
                registrationForm.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Optional: Track analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'registration_submit', {
                        'event_category': 'form',
                        'event_label': studentData.courses.join(', ')
                    });
                }

            } catch (error) {
                console.error('Error during registration:', error);
                
                let errorMessage = 'An error occurred during registration. Please try again.';
                
                if (error.code === 'permission-denied') {
                    errorMessage = 'Permission denied. Please check Firebase security rules.';
                } else if (error.code === 'unavailable') {
                    errorMessage = 'Service temporarily unavailable. Please try again later.';
                }
                
                showMessage(errorMessage, 'error');
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });

        // ========================================
        // SHOW MESSAGE FUNCTION
        // ========================================
        function showMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';

            // Auto-hide after 8 seconds for success messages
            if (type === 'success') {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 8000);
            }

            // Add animation
            formMessage.style.animation = 'slideIn 0.3s ease-out';
        }

        // ========================================
        // REAL-TIME VALIDATION FEEDBACK
        // ========================================
        const inputs = registrationForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                    this.style.borderColor = '#dc3545';
                } else {
                    this.classList.remove('error');
                    this.classList.add('success');
                    this.style.borderColor = '#28a745';
                }
            });

            input.addEventListener('focus', function() {
                this.style.borderColor = '#c6bbe6';
                this.classList.remove('error', 'success');
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error') && this.value.trim()) {
                    this.classList.remove('error');
                    this.style.borderColor = '#DCD0FF';
                }
            });
        });

        // ========================================
        // EMAIL VALIDATION
        // ========================================
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(this.value)) {
                    this.classList.add('error');
                    this.style.borderColor = '#dc3545';
                    showFieldError(this, 'Please enter a valid email address');
                } else {
                    this.classList.remove('error');
                    this.classList.add('success');
                    this.style.borderColor = '#28a745';
                    removeFieldError(this);
                }
            });
        }

        // ========================================
        // PHONE NUMBER VALIDATION
        // ========================================
        const mobileInput = document.getElementById('mobile');
        if (mobileInput) {
            mobileInput.addEventListener('input', function() {
                // Allow only numbers, +, -, (), and spaces
                this.value = this.value.replace(/[^0-9+\-() ]/g, '');
            });

            mobileInput.addEventListener('blur', function() {
                const phonePattern = /^[\d+\-() ]{10,}$/;
                if (!phonePattern.test(this.value)) {
                    this.classList.add('error');
                    this.style.borderColor = '#dc3545';
                    showFieldError(this, 'Please enter a valid phone number (min 10 digits)');
                } else {
                    this.classList.remove('error');
                    this.classList.add('success');
                    this.style.borderColor = '#28a745';
                    removeFieldError(this);
                }
            });
        }

        // ========================================
        // COURSE SELECTION VALIDATION
        // ========================================
        const checkboxes = registrationForm.querySelectorAll('input[type="checkbox"][name="courses[]"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedCount = registrationForm.querySelectorAll('input[type="checkbox"][name="courses[]"]:checked').length;
                const checkboxGroup = this.closest('.checkbox-group');
                
                if (checkedCount > 0) {
                    checkboxGroup.style.borderColor = '';
                    removeFieldError(checkboxGroup);
                }
            });
        });

        // ========================================
        // HELPER FUNCTIONS FOR FIELD ERRORS
        // ========================================
        function showFieldError(field, message) {
            let errorDiv = field.parentElement.querySelector('.field-error');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.cssText = 'color: #dc3545; font-size: 1.4rem; margin-top: 0.5rem;';
                field.parentElement.appendChild(errorDiv);
            }
            errorDiv.textContent = message;
        }

        function removeFieldError(field) {
            const errorDiv = field.parentElement.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }

        // ========================================
        // FORM AUTO-SAVE (OPTIONAL)
        // ========================================
        // Save form data to localStorage as user types
        const autoSaveFields = ['fullname', 'email', 'mobile', 'address'];
        autoSaveFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                // Load saved data
                const savedValue = localStorage.getItem('form_' + fieldName);
                if (savedValue) {
                    field.value = savedValue;
                }

                // Save on input
                field.addEventListener('input', function() {
                    localStorage.setItem('form_' + fieldName, this.value);
                });
            }
        });

        // Clear saved data on successful submission
        registrationForm.addEventListener('submit', function() {
            setTimeout(() => {
                if (formMessage.classList.contains('success')) {
                    autoSaveFields.forEach(fieldName => {
                        localStorage.removeItem('form_' + fieldName);
                    });
                }
            }, 1000);
        });
    }
    
    console.log('Form handler with Firebase & Email initialized successfully');
});

// Add CSS animation for message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
