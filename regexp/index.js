
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


        var preview = document.querySelector('#preview');
        var description = document.querySelector('#description');
        var ruleDescriptionS = /\+\+(.*?)\+\+|--(.*?)--/g;
        //var ruleDescriptionI = /--(.*?)--/g;
        var ruleDescriptionImg = /\((https:\/\/)(.*?)(\.jpg|\.png)\)/gi;
        var ruleDescriptionLink =

        newDescription = description.value.replaceAll(ruleDescriptionS , '<strong>$1</strong> , <i>$2</i>');
        //newDescription = description.value.replaceAll(, '<i>$1</i>');

        newDescriptionImg = newDescription.replaceAll(ruleDescriptionImg , '<img src="$1$2$3"/>' );

        newDescriptioLink = newDescriptionImg.replaceAll(ruleDescriptionLink , '' );



        preview.innerHTML = newDescriptionLink;

    });

        $('.btn-group').on('click', '.btn', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
});
