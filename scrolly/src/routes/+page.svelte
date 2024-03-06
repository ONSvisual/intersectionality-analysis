<script>
  import { base } from "$app/paths";
  import {
    Button,
    Header,
    Hero,
    Section,
    Grid,
    Em,
    Main,
    Scroller,
    ScrollerSection,
    Footer,
    Notice,
    List
  } from "@onsvisual/svelte-components";

  import { DotPlotChart } from "@onsvisual/svelte-charts";

  import mq from "../stores/mq.js";

  export let data;
  let dotplotdata = data.data;





  let filteredData = dotplotdata.filter(d => d.category=='model1'); 
  let unemployment = dotplotdata.filter(d => d.category=='Unemployment')
  let model5 = dotplotdata.filter(d => d.category=='model5').sort((a,b)=>b.value-a.value); 
  let ghosts
  let snake = null;
  let other = [];

  let unemploymentHighlightsFilters = [
    [null],//1
    ["Other: Arab",[0]],//2
    ["Black: Other",[0]],//3
    ["White: Irish",[0], "White: British"],//4
    [null]
  ]
  
  let unemploymentHighlights=[null]
   
  let filterfuncs = [
    (d) => d.category=='model1',//1
    (d) => d.category=='model2',//2
    (d) => d.category=='model2',//3
    (d) => d.category=='model2',//4
    (d) => d.category=='model3',//5
    (d) => d.category=='model3',//6
    (d) => d.category=='model3',//7
    (d) => d.category=='model3',//8
    (d) => d.category=='model4',//9
    (d) => d.category=='model4',//9.5
    (d) => d.category=='model4',//10
    (d) => d.category=='model4',//11
    (d) => d.category=='model5',//12
    //(d) => d.category=='model5',//13
    // (d) => d.category=='model5',//14
    (d) => d.category=='model5',//15
    (d) => d.category=='model5',//16
    (d) => d.category=='model5',//17
    (d) => d.category=='model5',//18
    (d) => d.category=='model5',//19
  ];

  let highlightCategories = [
    [null],//1
    [null],//2
    ["Mixed: White and Black Caribbean",[0]],//3
    ["White: Irish",[1]],//4
    [null],//5
    ["Other: Arab",[0]],//6
    ["White: British",[1]],//7
    ["White: Gypsy or Irish Traveller",[0,1]],//8
    [null],//9.5
    ["White: Gypsy or Irish Traveller",[0,1]],//9
    ["White: Other",[1]],//10
    ["Asian: Chinese",[0]],//11
    [null],//12
    //["Other: Arab",[0,1]],//13
    // [],//14
    ["Other: Arab",[0],"Black: African","Asian: Bangladeshi"],//15
    ["White: Irish",[1],"White: British","White: Other"],//16
    ["Other: Arab",[1],],//17
    ["White: British",[0]],//18
    ["Other: Arab",[0,1],"Black: Other"]//19
  ]

  let highlightThis=[null]

  let otherHighlights = [
    ["Mixed: White and Black Caribbean","White: Gypsy or Irish Traveller","Mixed: Other", "White: Roma","Mixed: White and Asian","Black: Caribbean","Asian: Pakistani","Asian: Other","White: Other","White: Irish","Asian: Indian","Asian: Chinese","White: British",0],
    ["Other: Arab","Mixed: White and Black African","Black: Other","Black: African","Asian: Bangladeshi","White: Gypsy or Irish Traveller","Black: Caribbean","Asian: Pakistani",1]
  ]

  let snakeFilters = [
    d=>d==null,//1
    d=>d==null,//2
    (d) => ['model1','model2'].includes(d.category) && d.name == "Mixed: White and Black Caribbean" && d.cat=='Disabled adults',//3
    (d) => ['model1','model2'].includes(d.category) && d.name == "White: Irish" && d.cat=='Non-disabled adults',//4
    d=>d==null,//5
    (d) => ['model2','model3'].includes(d.category) && d.name == "Other: Arab" && d.cat=='Disabled adults',//6
    (d) => ['model2','model3'].includes(d.category) && d.cat=='Non-disabled adults' && d.name == "White: British",//7
    (d) => ['model2','model3'].includes(d.category) && d.cat=='Non-disabled adults' && d.name=="White: Gypsy or Irish Traveller",//8
    d=>d==null,//9.5
    (d) => ['model3','model4'].includes(d.category) && d.cat=='Non-disabled adults' && d.name=="White: Gypsy or Irish Traveller",//9
    (d) => ['model3','model4'].includes(d.category) && d.cat=='Disabled adults' && d.name == "White: Other",//10
    (d) => ['model3','model4'].includes(d.category) && d.cat=='Disabled adults' && d.name == "Asian: Chinese",//11
    d=>d==null,//12
    // d=>d==null,//13
    // d=>d==null,//14
    d=>d==null,//15
    d=>d==null,//16
    d=>d==null,//17
    d=>d==null ,//18
    (d) => ['model5'].includes(d.category) && ["Other: Arab"].includes(d.name)//19
  ]

  let snake2;
  let snake2array=[
    (d) => ['model5'].includes(d.category) && d.name=="Black: Other",//19
    (d) => ['model3','model4'].includes(d.category) && d.cat=='Disabled adults' && d.name=="White: Gypsy or Irish Traveller", //9
    (d) => ['model2','model3'].includes(d.category) && d.cat=='Disabled adults' && d.name=="White: Gypsy or Irish Traveller"//8
  ]

  let refValueArray =[
    null,//1
    null,//2
    null,//3
    null,//4
    null,//5
    null,//6
    null,//7
    null,//8
    null,//9
    null,//9.5
    null,//10
    null,//11
    null,//12
    //null,//13
    // null,//14
    null,//15
    null,//16
    9.8951746,//17
    5.9402273,//18
    null,//19
  ]

  let refvalue=null;

  let index = null;

</script>

<Header compact />
<Main>

<Hero
  title="Understanding unemployment: what role does ethnicity and disability play?"
  lede="Our interactive analysis of England and Wales Census 2021 data seeks to examine how unemployment rates vary at the intersection of ethnicity and disability."
  date="2024-01-10"
>
  <!-- <Checkbox label="Enable animation" variant="ghost" checked={animation} noBorder/> -->
</Hero>

<!-- section1 -->
<Section title="" marginTop={true}>
  <p>
    Unemployment varied greatly by disability and ethnicity, with Census 2021 estimated unemployment rates for some groups as low as 2.9%, while for others it was up to 17.2%.
  </p>

  <p>
    That is according to analysis of people aged 16 years and over who were actively engaged in the labour market at the time of Census 2021. These estimated unemployment rates account for factors associated with high levels of unemployment, including age, sex and place. 
  </p>

  <h3>Unemployment rates for disabled and non-disabled groups varied greatly when other factors were accounted for </h3>
  <h4>Estimated unemployment rates for disabled and non-disabled adults in England and Wales, 2021 </h4>
  <DotPlotChart
          padding={$mq.sm ? { top: 25, left: 10, right: 50, bottom: 30 }: { top: 25, left: 250, right: 50, bottom: 30 }}
          height={$mq.sm ? "90vh" : "600px"}
          data={model5}
          xKey="value"
          zKey="cat"
          colors={["#206095", "#f66068"]}
          yKey="name"
          xMax={25}
          legend={true}
          footer="Estimated unemployment rate (%)"
          mobile={$mq.sm}
          highlighted={[null]}
  >
  </DotPlotChart>
  <h5>Source: Census 2021 from the Office for National Statistics</h5>
  <Button icon='download' href="{base}/data/chart1.xlsx" iconPosition='before'>Download the data for estimated unemployment rates for disabled and non-disabled adults by ethnicity (XLSX, 10KB)</Button>
  <h4>Notes:</h4>
  <List mode="number">
    <li>For the purpose of this visual, shortened versions of the full ethnic group labels have been used. <a href="https://www.ons.gov.uk/census/census2021dictionary/variablesbytopic/ethnicgroupnationalidentitylanguageandreligionvariablescensus2021/ethnicgroup">View the full labels.</a></li>
    <li>Unemployment rates have been estimated while controlling for: age, sex, region, urban or rural status, education, sexual orientation, English language proficiency and marital status. </li>
  </List>

  <p>Overall, disabled adults were more likely to be unemployed than non-disabled adults. However, disabled adults across England and Wales who identified as "White: English, Welsh, Scottish, Northern Irish or British" were less likely to be unemployed than many non-disabled adults from other ethnic groups.</p>

  <p>Non-disabled adults who identified with "Other ethnic group: Arab", meanwhile, had a greater likelihood of being unemployed on average than many disabled adults from other ethnic groups.</p>
  
  <p>
    The analysis also revealed that age and sex had the largest influence on differences in estimated unemployment rates compared with other factors such as place and highest level of education.   
  </p>

  <p>
    This article sheds light on how a combination of two <a href="https://www.equalityhumanrights.com/equality/equality-act-2010/protected-characteristics">protected characteristics</a> such as ethnicity (the ethnic group that someone feels they belong to) and disability status (if someone's daily activities are limited by long-term physical or mental health conditions or illnesses) are linked to many factors that have an impact on people's lives and livelihoods. Accounting for other factors that affect employment, we found that disabled adults from some ethnic groups are disproportionately affected. Further research is needed to investigate reasons for this.
  </p>
  <p>
    All 19 ethnic groups in this article are tick-box selections within five main categories in Census 2021. By adding disability status, disabled or non-disabled, 38 intersections were considered.
  </p>

  <Notice mode="info">
    <p>Intersectionality is an analytical approach used to explore how life outcomes vary by different dimensions of equality. Social research often focusses on social identity categories in isolation, but this can overlook the disadvantages that many people in society face because of the combined effects of their multiple characteristics or social identities.</p>
  </Notice>
</Section>

<!-- section2 -->
<Section
  title="Unemployment rates varied considerably by ethnic group and disability status "
>
  <p>
    Before adjusting for other factors, the unemployment rate (the proportion of adults either in work or looking for and available to start work who are unemployed) for disabled adults across England and Wales was 9.2% at the time of Census 2021, which was higher than the overall rate of 5.7% for all adults in the labour market. For non-disabled adults, it was 5.3%.
  </p>

</Section>


  <Scroller
  id="scroller1"
  on:change={(e) => {
    unemploymentHighlights=unemploymentHighlightsFilters[e.detail.index]
  }}
>
  <div slot="background">
    <Grid width="full" height="full">
      <div class="placeholder-block">
        <DotPlotChart
          padding={$mq.sm ? { top: 25, left: 10, right: 50, bottom: 30 } : { top: 25, left: 250, right: 50, bottom: 30 }}
          height={$mq.sm ? "85vh" : "90vh"}
          data={unemployment}
          xKey="value"
          zKey="cat"
          colors={["#118c7b"]}
          yKey="name"
          xMax={25}
          legend={true}
          footer="Unemployment rate (%)"
          highlighted={unemploymentHighlights}
          colorHighlight="orange"
          mobile={$mq.sm}
        />
      </div>
    </Grid>
  </div>
  <div slot="foreground">
    <!-- one -->
    <ScrollerSection>
      <p>
        There were also significant variations in the unemployment rate between the 19 ethnic groups recorded in Census 2021, ranging from 4.7% to 14.3%. 
      </p>
    </ScrollerSection>

    <!-- two -->
    <ScrollerSection>
      <p>The group with the highest rate of unemployment was those who selected the <Em>"Other ethnic group: Arab"</Em> tickbox (14.3%). </p>

    </ScrollerSection>

    <!-- three -->
    <ScrollerSection>
      <p>This was followed by those who identified as <Em>"Black, Black British, Black Welsh, Caribbean or African: Other Black"</Em> with a rate of 14.2%. </p>
    </ScrollerSection>

    <!-- four -->
    <ScrollerSection>
      <p>Adults who identified as <Em>"White: Irish"</Em> had the lowest unemployment rate (4.7%), followed by those who identified as <Em>"White: English, Welsh, Scottish, Northern Irish or British"</Em> (4.9%).</p>
    </ScrollerSection>
      
  </Scroller>

<Section>
  <h5>Source: Census 2021 from the Office for National Statistics</h5>
  <Button icon='download' href="{base}/data/chart2.xlsx" iconPosition='before'>Download the data for unemployment rates by ethnicity (XLSX, 12KB)</Button>
  <h4>Notes:</h4>
  <List mode="number">
    <li>For the purpose of this visual, shortened versions of the full ethnic group labels have been used. <a href="https://www.ons.gov.uk/census/census2021dictionary/variablesbytopic/ethnicgroupnationalidentitylanguageandreligionvariablescensus2021/ethnicgroup">Click here to see the full labels.</a></li>
  </List>
</Section>

<Section
  title="Accounting for more characteristics affects different populations in various ways"
>
  <p>
    Analysing unemployment rates by disability status and ethnic group show us how common unemployment is among those groups separately. 
  </p>

  <p>
    We may also want to know the impact of a combination of these characteristics, such as the unemployment rate for adults who are disabled and of a certain ethnic group.
  </p>

  <p>
    To do this, we have used a method called regression modelling, which allows us to predict the likelihood of an outcome (whether someone is unemployed) based on a set of characteristics (including a combination of disability status and ethnic group).
  </p>

  <p>
    The analysis shows the estimated unemployment rates for each ethnic group, both for adults within that group who are disabled and non-disabled. These unemployment rates have been estimated from the outputs of the regression model.
  </p>

  <p>
    However, the unemployment rate of a particular group can be influenced by many factors other than their ethnic group and disability status, such as age. The percentage of people with a disability increases with age, employment varies by age and age profiles differ by ethnic group.
  </p>

  <p>
    Regression modelling can be used to adjust  for some of these other factors.
  </p>

  <p>
    This lets us look more directly at the impact someone's disability and ethnic group has on their unemployment status by holding equal some other factors that could influence unemployment, such as age. 
  </p>
</Section>



<Scroller
  id="scroller2"
  on:change={(e) => {
    filteredData = dotplotdata.filter(filterfuncs[e.detail.index]);
    highlightThis = highlightCategories[e.detail.index];
    // console.log(e.detail.index)
    if(e.detail.index>0&&e.detail.index<4) ghosts = dotplotdata.filter(filterfuncs[0])
    else if(e.detail.index>=3&&e.detail.index<8) ghosts = dotplotdata.filter(filterfuncs[3])
    else if(e.detail.index>=7&&e.detail.index<13) ghosts = dotplotdata.filter(filterfuncs[4])
    else ghosts = null;
    snake = dotplotdata.filter(snakeFilters[e.detail.index]);
    refvalue=refValueArray[e.detail.index]

    if(e.detail.index==15){other=otherHighlights[0]}
    else if(e.detail.index==16){other=otherHighlights[1]}
    else{other=[]}

    if(e.detail.index==17){snake2=dotplotdata.filter(snake2array[0])}
    else if(e.detail.index==9){snake2=dotplotdata.filter(snake2array[1])}
    else if(e.detail.index==7){snake2=dotplotdata.filter(snake2array[2])}
    else{snake2=[]}
    index= e.detail.index;
  }}
>
  <div slot="background">
    <Grid width="full" height="full">
      <div class="placeholder-block">
        <DotPlotChart
        padding={$mq.sm ? { top: 25, left: 20, right: 50, bottom: 30 } : { top: 25, left: 250, right: 50, bottom: 30 }}
        height="90vh"
          data={filteredData}
          xKey="value"
          zKey="cat"
          colors={["#206095", "#f66068"]}
          yKey="name"
          xMax={25}
          legend={true}
          footer="Estimated unemployment rate (%)"
          highlighted={highlightThis}
          {ghosts}
          {snake}
          colorHighlight="orange"
          refvalue = {refvalue}
          mobile={$mq.sm}
          {other}
          {index}
          {snake2}
        />
      </div>
    </Grid>
  </div>
  <div slot="foreground">
    <!-- one -->
    <ScrollerSection>
      <p>Here is the model <u>without</u> any adjustments. </p>

    </ScrollerSection>
    


    <!-- two -->
    <ScrollerSection>
      <p>
        Here, we have controlled for <u>age and sex</u> in our model. We are effectively predicting what the differences in the likelihood of unemployment would be between our groups if they were all the same age and sex. 
      </p>

      <p>
        The largest differences in unemployment rates between models were seen when age and sex were added, with the unemployment rate decreasing for every group. This might be expected as unemployment rates, ethnicity and disability all vary by age and sex. 
      </p>
    </ScrollerSection>

    <!-- three -->
    <ScrollerSection>
      <p>
        However, it drops the most (7.5 percentage points) for disabled adults who identified as <Em>"White and Black Caribbean"</Em> (within the Mixed or Multiple ethnic group). 
      </p>
      <p>
        According to Census 2021 data, a much higher percentage of this group were aged <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/ethnicity/datasets/ethnicgroupbyageandsexinenglandandwales">16 to 24 years when compared with the overall population</a>.
      </p>

      <p>
        Unemployment rates for this age group are <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/diversityinthelabourmarketenglandandwales/census2021">typically higher than for older age groups</a>. That means age could be a contributing factor to the higher likelihood of unemployment for this group.
      </p>
    </ScrollerSection>

    <!-- four -->
    <ScrollerSection>
      <p>
        In comparison, unemployment rate drops by the smallest amount (0.8 percentage points) for non-disabled adults who selected <Em>"White: Irish"</Em> when controlling for age and sex. 
      </p>
    </ScrollerSection>

    <!-- five -->
    <ScrollerSection>
      <p>Now we have also controlled for the <u>region</u> where someone lives, and whether they live in an <u>urban or rural area</u>. This has a smaller impact on the differences in unemployment rate than when just controlling for age and sex.</p>
    </ScrollerSection>

    <!-- six -->
    <ScrollerSection>
      <p>The largest change was for disabled adults who selected <Em>"Other ethnic group: Arab"</Em>. This suggests that this group was more likely to live in areas where finding employment was harder.</p>
      
      <p>A high proportion of this group lived in London (47.6%), compared with an average of 16% for the economically active population, a city with a typically <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/employmentinregionsofenglandandthecountryofwales">higher rate of unemployment</a>.</p>
    </ScrollerSection>

    <!-- seven -->
    <ScrollerSection>
      <p>The group that saw the smallest change was non-disabled adults who identified as <Em>"White: English, Welsh, Scottish, Northern Irish or British"</Em>.</p>
    </ScrollerSection>

    <!-- eight -->
    <ScrollerSection>
      <p>The addition of geographical factors increased the likelihood of unemployment for both disabled and non-disabled adults who identified as <Em>"White: Gypsy or Irish Traveller"</Em>.</p>

      <p>The reason for this was not clear, but our qualitative research explored lived experiences of Gypsy and Traveller communities and found that the individual <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/ethnicity/bulletins/gypsiesandtravellerslivedexperiencescultureandidentityenglandandwales/2022">preference for a nomadic lifestyle affected employment</a>.</p>
    </ScrollerSection>



    <!-- 9 -->
    <ScrollerSection>
      <p>Now we have also controlled for <u>highest level of education</u> achieved. </p>
    </ScrollerSection>

    <!-- 9.5 -->
    <ScrollerSection>
      <p>Adults who selected the <Em>"White: Gypsy or Irish Traveller"</Em> tick box were affected the most – for both the disabled and non-disabled groups.</p>

      <p>
        There was a higher proportion of adults from this ethnic group <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/ethnicity/articles/ethnicgroupdifferencesinhealthemploymenteducationandhousingshowninenglandandwalescensus2021/2023-03-15">with no qualifications compared with the overall population</a>, which suggests this factor is an influence on their likelihood of being unemployed. 
      </p>
    </ScrollerSection>


    <!-- 10 -->
    <ScrollerSection>
      <p>In comparison, the smallest change was seen in disabled adults who identified as <Em>"White: Other White"</Em>. </p>
    </ScrollerSection>


    <!-- 11 -->
    <ScrollerSection>
      <p>Disabled adults who identified as <Em>"Asian, Asian British or Asian Welsh: Chinese"</Em> had the largest increase in likelihood of unemployment. This group has a higher proportion of adults with higher qualifications compared with the overall economically active population.</p>

      <p>This shows that higher levels of qualification achieved is linked to lower unemployment rates for this group.</p>
    </ScrollerSection>


    <!-- 12 -->
    <ScrollerSection>
      <p>Our final model also controls for <u>sexual orientation, English language proficiency and marital status</u>. We have now controlled for many factors related to ethnic group, disability and unemployment from Census 2021.
      </p>

      <p>This model saw variation in the difference in unemployment rate between disabled and non-disabled adults across the 19 ethnic groups.</p>

      <p>We can now see how some groups are disproportionately affected when we hold many factors that can affect unemployment rates constant.</p>
    </ScrollerSection>


    <!-- 13 
    <ScrollerSection>
      <p>We still cannot say with certainty that someone's disability status and ethnicity are the cause of their likelihood of being unemployed. However, this modelling gives us the closest understanding of the impact of someone's disability status and ethnicity on their chance of being unemployed using Census 2021. </p>
    </ScrollerSection>
    -->

    <!-- 14 -->
    <!-- <ScrollerSection>
      <p>We still cannot say with certainty that someone's disability status and ethnicity are the cause of their likelihood of being unemployed. However, this modelling gives us the closest understanding of the impact of someone's disability status and ethnicity on their chance of being unemployed.</p>

    </ScrollerSection> -->


    <!-- 15 -->
    <ScrollerSection>
      <p>The three groups with the highest likelihood of unemployment were adults who were disabled and identified as <Em>"Other ethnic group: Arab"</Em> (17.2%), <Em>"Black, Black British, Black Welsh, Caribbean or African: African"</Em> (11.1%) or <Em>"Asian, Asian British or Asian Welsh: Bangladeshi"</Em> (11.1%).</p>
    </ScrollerSection>


    <!-- 16 -->
    <ScrollerSection>
      <p>The three groups least likely to be unemployed were all non-disabled adults. They identified as: <Em>"White: Irish"</Em> (3.6%), <Em>"White: Other White"</Em> (3.5%) or <Em>"White: English, Welsh, Scottish, Northern Irish or British"</Em> (2.9%).</p>
    </ScrollerSection>

    <!-- 17 -->
    <ScrollerSection>
      <p>Non-disabled adults who identified as <Em>"Other ethnic group: Arab"</Em> had a higher likelihood of unemployment than disabled adults who identified with 13 of the 19 ethnic groups.</p>
      <p>Coupled with the high likelihood of unemployment of disabled adults who selected the "Other ethnic group: Arab" tick box, this shows ethnicity plays a larger role in high levels of unemployment for this group than disability does for many ethnic groups.</p>
    </ScrollerSection>


    <!-- 18 -->
    <ScrollerSection>
      <p>In the other direction, disabled adults who identified as <Em>"White: English, Welsh, Scottish, Northern Irish or British"</Em> were less likely to be unemployed than non-disabled adults who identified with 8 of the 19 ethnic groups.</p>
    </ScrollerSection>


    <!-- 19 -->
    <ScrollerSection>
      <p>Within each ethnic group, the largest difference in unemployment rate between disabled and non-disabled adults was 7.3 percentage points for the <Em>"Other ethnic group: Arab"</Em> group (17.2% compared with 9.9%).</p> 

      <p>Adults who selected the <Em>"Black, Black British, Black Welsh, Caribbean or African: Other"</Em> tick box had the smallest difference.</p>
    </ScrollerSection>
  </div>
</Scroller>

<Section>
  <h5>Source: Census 2021 from the Office for National Statistics</h5>
  <Button icon='download' href="{base}/data/chart3.xlsx" iconPosition='before'>Download the data for estimated unemployment rates for disabled and non-disabled adults by ethnicity and stage of model (XLSX, 16KB)</Button>
  <h4>Notes:</h4>
  <List mode="number">
    <li>For the purpose of this visual, shortened versions of the full ethnic group labels have been used. <a href="https://www.ons.gov.uk/census/census2021dictionary/variablesbytopic/ethnicgroupnationalidentitylanguageandreligionvariablescensus2021/ethnicgroup">Click here to see the full labels.</a></li>
  </List>

  <Notice mode="info">
    <p>This article forms part of the Office for National Statistics' commitment to the <a href="https://uksa.statisticsauthority.gov.uk/publication/inclusive-data-taskforce-implementation-plan/pages/5/#pid-to-promote-an-intersectional-approach-to-exploring-and-presenting-equalities-data-">Inclusive Data Task Force under Inclusive Data Principle 4</a> to undertake intersectional analysis using the Census 2021. </p>
  </Notice>
  </Section>

  <Section>
  <p>
    To fit the regression models, we randomly sampled 2.35% of economically active Census 2021 respondents aged at least 16 years who were employed and 10% of those who were unemployed. We used sampling weights in the models to ensure the sample was reflective of the full economically active Census 2021 population aged at least 16 years. 
  </p>

  <p>Marginal means were then estimated from the output of the regression models to give the adjusted unemployment rates of the intersections of disability status and ethnic group. For each model, the marginal means were obtained as weighted averages of predicted values across socio-demographic profiles according to the characteristics in the mode (averaged within ethnic groups and disability statuses), where the weights, derived using the sample weights, were proportional to the observed multivariate distribution of the socio-demographic characteristics.</p>

  <p>
    Census 2021 was conducted during the coronavirus (COVID-19) pandemic, a period of unparalleled and rapid change. It is possible that this affected the way some people responded to the labour market questions on the census. 
  </p>

  <p>Estimates from Census 2021 will also differ to those collected on the <a href="https://www.ons.gov.uk/surveys/informationforhouseholdsandindividuals/householdandindividualsurveys/labourforcesurvey">Labour Force Survey</a> because of a range of conceptual differences between the two sources. For further information about interpreting census labour market data, see our <a href="https://www.ons.gov.uk/releases/comparingcensus2021andlabourforcesurveyestimatesofthelabourmarketenglandandwalesmarch2021">Comparing Census 2021 and Labour Force Survey estimates of the labour market, England and Wales: 13 March 2021 article</a>.</p>
</Section>
<Footer compact />
</Main>
<style>
  h5{
    font-size: 16px;
    margin: 16px 0 16px;
    font-weight: 400;
    color: #707071;
  }
</style>