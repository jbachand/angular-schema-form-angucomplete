Angucomplete addon
=================

Example Form Data:

```
{
  "key": "company",
  "type": "angucomplete",
  completeOptions: {
    url: 'https://autocomplete.clearbit.com/v1/companies/suggest?query=', //remote url
    //data: [{name:'etsy'},{name:'aa'}], //local data
    title: 'name',
    image: 'logo',
    search: 'name',
    focusOut: function(){
      console.log('unfocus');
    }
  }
}
