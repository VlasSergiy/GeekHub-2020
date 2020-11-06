
document.querySelector('#user-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var fullName = document.querySelector('[name="full_name"]');
    var email = document.querySelector('[name="email"]');
    var pass = document.querySelector('[name="password"]');

    var ruleFullName = /^[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+\s+[а-яА-ЯіІїЇєЄґҐ']+$/;
    var ruleEmail = /^(?!\.)([a-zA-Z0-9-.]+)(?<!\.)@(?!\.)([a-zA-Z0-9-.]+)\.([a-zA-Z0-9-.]+)(?<!\.)$/;
    var rulePass = /^(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;

    fullName.style.backgroundColor = ruleFullName.test(fullName.value) ? '#C2E0C6' : '#F9D0C4';
    email.style.backgroundColor = ruleEmail.test(email.value) ? '#C2E0C6' : '#F9D0C4';
    pass.style.backgroundColor = rulePass.test(pass.value) ? '#C2E0C6' : '#F9D0C4';
});

document.querySelectorAll('[data-show]').forEach(function (button) {
    button.addEventListener('click', function (e) {
        document.querySelector('#description').classList.add('d-none');
        document.querySelector('#preview').classList.add('d-none');

        document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');

        //var description = document.querySelector('[name="description"]');
        //var word = description.match(/\+\+(.*?)\+\+/g);
        //var newDescription = description.replace(/\+\+(.*?)\+\+/g, (word));

        //console.log(newDescription);

        $('.btn').click(function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });

    });
});
