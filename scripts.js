let allMails = [];

window.onload = function() {
    fetch('Mails.json')
        .then(response => response.json())
        .then(data => {
            allMails = data;
            displayMails(data);
        });
}

function displayMails(mails) {
    const mailbox = document.getElementById('mailbox');
    mailbox.innerHTML = '';  // clear previous mails
    mails.forEach(mail => {
        const mailDiv = document.createElement('div');
        mailDiv.className = 'emailPreview';
        mailDiv.innerHTML = `
            <div>${mail.Absender}</div>
            <div>${mail.Betreff}</div>
            <div>${mail.Eingang}</div>
        `;
        mailDiv.addEventListener('click', () => displayMail(mail));
        mailbox.appendChild(mailDiv);
    });
}

function displayMail(mail) {
    document.getElementById('mailbox').style.display = 'none';
    document.getElementById('emailView').style.display = 'block';

    document.getElementById('emailSubject').innerText = mail.Betreff;
    document.getElementById('emailSender').innerText = mail.Absender;
    document.getElementById('emailDate').innerText = mail.Eingang;
    document.getElementById('emailText').innerText = mail.Text;
}

function goBack() {
    document.getElementById('emailView').style.display = 'none';
    document.getElementById('mailbox').style.display = 'block';
}

function searchMails() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredMails = allMails.filter(mail => mail.Absender.toLowerCase().includes(query));
    displayMails(filteredMails);
}
